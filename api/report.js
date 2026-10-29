const crypto = require('crypto');

const BASE = 'https://api.hyros.com/v1/api/v1.0';
const MAX_PAGES = 8;

async function hyros(path, params, key) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params || {})) {
    if (v != null) url.searchParams.set(k, Array.isArray(v) ? v.join(',') : v);
  }
  const res = await fetch(url, { headers: { 'API-Key': key } });
  if (!res.ok) throw Object.assign(new Error(`Hyros ${path} returned ${res.status}`), { status: res.status });
  return res.json();
}

function samePassword(given, expected) {
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function classify(e) {
  const name = e.name || '';
  const lower = name.toLowerCase();
  const traffic = ((e.trafficSource && e.trafficSource.name) || '').toLowerCase();
  const ad = (e.ad && e.ad.name) || (e.campaign && e.campaign.name) || '';
  const tip = [e.campaign && e.campaign.name, e.adSet && e.adSet.name, e.ad && e.ad.name].filter(Boolean).join(' / ') || name;

  if (lower.includes('organic')) {
    const label = lower.includes('google') ? 'Google organic'
      : lower.includes('facebook') ? 'Facebook organic'
      : lower.includes('instagram') ? 'Instagram organic'
      : lower.includes('tiktok') ? 'TikTok organic'
      : 'Organic';
    return { kind: 'organic', label, detail: name, tip: name };
  }
  if (e.emailSource) {
    if (lower.includes('manychat')) {
      return { kind: 'organic', label: 'Manychat', detail: name.replace(/^manychat\s*/i, ''), tip: name };
    }
    return { kind: 'organic', label: 'Email', detail: name, tip: name };
  }
  if (traffic.includes('facebook') || traffic.includes('meta') || e.extra === 'FACEBOOK') return { kind: 'meta', label: 'Meta', detail: ad, tip };
  if (traffic.includes('google')) return { kind: 'google', label: 'Google Ads', detail: ad, tip };
  if (traffic.includes('tiktok')) return { kind: 'tiktok', label: 'TikTok', detail: ad, tip };
  if (traffic.includes('reddit')) return { kind: 'reddit', label: 'Reddit', detail: ad, tip };
  if (traffic.includes('snap')) return { kind: 'snapchat', label: 'Snapchat', detail: ad, tip };
  const label = traffic ? traffic.charAt(0).toUpperCase() + traffic.slice(1) : 'Other';
  return { kind: 'other', label, detail: name, tip: name };
}

function touchpoints(journey) {
  const sales = (journey.sales || []).slice().sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
  const events = (journey.journey || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const out = [];
  for (const e of events) {
    if (e.type === 'sl') out.push(classify(e));
    else if (e.type === 'call' || e.type === 'booking') {
      out.push({ kind: 'call', label: 'Booked call', detail: e.name || '', tip: e.name || '' });
    } else if (e.type === 'sale') {
      const sale = sales.shift();
      const price = sale && sale.usdPrice ? sale.usdPrice.price : null;
      const product = e.name || (sale && sale.product && sale.product.name) || '';
      const detail = (price != null ? `$${price} · ` : '') + product;
      out.push({ kind: 'purchase', label: 'Purchase made', detail, tip: detail });
    }
  }
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const key = process.env.HYROS_API_KEY;
  const password = process.env.REPORT_PASSWORD;
  if (!key || !password) {
    return res.status(503).json({ error: 'Set HYROS_API_KEY and REPORT_PASSWORD in the Vercel environment variables.' });
  }
  if (!samePassword(req.headers['x-report-password'], password)) {
    return res.status(401).json({ error: 'Wrong password.' });
  }

  const q = req.query || {};
  const want = Math.min(Math.max(parseInt(q.n, 10) || 30, 1), 100);
  const minTouchpoints = Math.max(parseInt(q.min, 10) || 1, 1);
  const from = q.from || new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);

  try {
    const leads = [];
    let skippedNoAttribution = 0;
    let scanned = 0;
    let pageId;
    for (let page = 0; page < MAX_PAGES && leads.length < want; page++) {
      const list = await hyros('/leads', { fromDate: from, pageSize: 100, pageId }, key);
      const batch = list.result || [];
      const attributed = batch.filter((l) => l.firstSource || l.lastSource);
      skippedNoAttribution += batch.length - attributed.length;
      scanned += batch.length;

      for (let i = 0; i < attributed.length && leads.length < want; i += 25) {
        const chunk = attributed.slice(i, i + 25);
        const journeys = await hyros('/leads/journey', { ids: chunk.map((l) => l.id), includeEvents: true }, key);
        for (const j of journeys) {
          if (!j.lead || j.lead.isOriginLead === false) continue;
          const tps = touchpoints(j);
          if (tps.length < minTouchpoints) continue;
          leads.push({ email: j.lead.email, created: j.lead.creationDate, touchpoints: tps });
          if (leads.length >= want) break;
        }
      }
      pageId = list.nextPageId;
      if (!pageId) break;
    }
    res.status(200).json({ leads, skippedNoAttribution, scanned, from, minTouchpoints });
  } catch (err) {
    res.status(err.status === 401 || err.status === 403 ? 502 : 500).json({ error: err.message });
  }
};
