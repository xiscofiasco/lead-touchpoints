// Made up demo journeys. Nothing here is real lead data.
(function () {
  var T = function (kind, label, detail) { return { kind: kind, label: label, detail: detail, tip: detail }; };
  var cycle = function (list) { var i = 0; return function () { return list[i++ % list.length]; }; };

  var prospecting = cycle(['Cold UGC Video V2', 'Lookalike 1% Static', 'Founder Story Reel']);
  var gads = cycle(['Brand Search Exact', 'Competitor Search', 'Generic Search']);
  var snap = cycle(['Story Ad 2', 'Spotlight 1']);
  var emails = cycle(['welcome_day1', 'promo_oct', 'nurture_2', 'day3_story', 'webinar_reminder', 'proposal_followup', 'nurture_1', 'day4_offer']);
  var calls = cycle(['Strategy Call', 'Discovery Call', 'Demo Call']);
  var buys = cycle(['$2,222 · Annual Program', '$1,497 · Coaching', '$67 · Workbook', '$1,063 · Starter', '$197 · Mini Course', '$5,400 · Team Plan', '$497 · Core Program', '$97 · Starter Kit', '$3,000 · VIP Day']);

  // m Meta, g Google Ads, s Snapchat, t TikTok, e Email, go Google Org, io Insta Org, mc Manychat, c Booked call, p Purchase
  var recipes = (
    'm e m c e p|m e m c p|g m e c p|m e c p|m io e p|s e p|m e p|m e p|m m p|g e p|' +
    'm g e p|go e p|m m|m e|io m e|m m|g m e|m c|m e e|s m e|' +
    'm|mc e p|m g e|m e c p|m m|g e|m io e p|m e p|m m e|go e e|' +
    'm g e p|m e|t m e|m m p|g g e|m e c p|m m|s s|m e p|m|' +
    'io e p|m g e|m e e|g e c p|m m|m e p|m c|go g e|m e|m m p|' +
    'm e m c p|s e c p|g m p|m e|m g e p|m m|m e p|m|m e|m m'
  ).split('|').map(function (r) { return r.split(' '); });

  var names = ('sarah dana nina ruth chris kai liam zoe tom mike alex lee ivy ben eva sol max omar jen pat ' +
    'anna bryan cora dean elle finn gina hugo iris jack kate leo mona nate olga paul quinn rosa sam tara ' +
    'uma vic wade xena yuri zane abby blake cleo drew emma flynn grace hank ivan jade kurt lola miles nora').split(' ');

  function touch(tok, isFirst) {
    switch (tok) {
      case 'm': return T('meta', 'Meta', isFirst ? prospecting() : 'Retargeting Carousel');
      case 'g': return T('google', 'Google Ads', gads());
      case 's': return T('snapchat', 'Snapchat', snap());
      case 't': return T('tiktok', 'TikTok', 'Hook Test 4');
      case 'e': return T('organic', 'Email', emails());
      case 'go': return T('organic', 'Google Org', 'google_organic');
      case 'io': return T('organic', 'Insta Org', 'instagram_organic');
      case 'mc': return T('organic', 'Manychat', 'Spring Giveaway');
      case 'c': return T('call', 'Booked call', calls());
      default: return T('purchase', 'Purchase made', buys());
    }
  }

  // Days back for each lead, newest first: 8 today, 8 yesterday, 14 this week, then older.
  var offsets = [].concat(
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6],
    [7, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    [32, 38, 44, 50, 56, 62, 70, 78, 86],
    [95, 110, 125, 140, 155, 170],
    [200, 260, 330]
  );
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  var nowMin = Math.max(20, Math.floor((now.getTime() - startOfToday) / 60000));
  var seen = {};
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  function stamp(i) {
    var off = offsets[i], j = seen[off] = (seen[off] === undefined ? 0 : seen[off] + 1);
    var minutes = off === 0 ? Math.floor(nowMin * (8 - j) / 8.6) : 1380 - j * 160 - (i * 13) % 40;
    return startOfToday - off * 86400000 + minutes * 60000 + ((i * 29) % 60) * 1000;
  }
  function format(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  window.DEMO = {
    demo: true,
    leads: recipes.map(function (r, i) {
      var ts = stamp(i);
      return {
        email: names[i] + '@example.com',
        joinedTs: ts,
        joined: format(ts),
        touchpoints: r.map(function (tok, k) { return touch(tok, k === 0); })
      };
    })
  };
})();
