// Made up demo journeys. Nothing here is real lead data.
(function () {
  var T = function (kind, label, detail) { return { kind: kind, label: label, detail: detail, tip: detail }; };
  var meta = function (d) { return T('meta', 'Meta', d); };
  var gads = function (d) { return T('google', 'Google Ads', d); };
  var tiktok = function (d) { return T('tiktok', 'TikTok', d); };
  var email = function (d) { return T('organic', 'Email', d); };
  var chat = function (d) { return T('organic', 'Manychat', d); };
  var gorg = function () { return T('organic', 'Google organic', 'google_organic'); };
  var igorg = function () { return T('organic', 'Instagram organic', 'instagram_organic'); };
  var call = function (d) { return T('call', 'Booked call', d); };
  var buy = function (d) { return T('purchase', 'Purchase made', d); };
  var C = 'Cold UGC Video V2', R = 'Retargeting Carousel';

  window.DEMO = {
    demo: true,
    skippedNoAttribution: 4,
    leads: [
      { email: 'sarah@example.com', touchpoints: [meta(C), email('welcome_day1'), meta(R), call('Strategy Call'), email('proposal_followup'), buy('$2,222 · Annual Program')] },
      { email: 'dana@example.com', touchpoints: [meta(C), email('promo_oct'), meta(R), call('Strategy Call'), buy('$1,497 · Coaching')] },
      { email: 'nina@example.com', touchpoints: [gads('Brand Search Exact'), meta(R), email('nurture_2'), call('Discovery Call'), buy('$3,000 · VIP Day')] },
      { email: 'ruth@example.com', touchpoints: [meta(C), email('webinar_reminder'), call('Demo Call'), buy('$5,400 · Team Plan')] },
      { email: 'chris@example.com', touchpoints: [meta(C), igorg(), email('welcome_day1'), buy('$97 · Starter Kit')] },
      { email: 'kai@example.com', touchpoints: [meta(C), igorg(), buy('$67 · Workbook')] },
      { email: 'liam@example.com', touchpoints: [meta(C), email('welcome_day1'), buy('$1,063 · Starter')] },
      { email: 'zoe@example.com', touchpoints: [meta(C), email('welcome_day1'), buy('$197 · Mini Course')] },
      { email: 'tom@example.com', touchpoints: [meta(C), meta(R), buy('$497 · Core Program')] },
      { email: 'mike@example.com', touchpoints: [gorg(), email('nurture_3'), buy('$1,063 · Starter')] },
      { email: 'alex@example.com', touchpoints: [chat('Spring Giveaway'), email('day2_story'), buy('$197 · Mini Course')] },
      { email: 'lee@example.com', touchpoints: [igorg(), meta(R), email('day3_story')] },
      { email: 'ivy@example.com', touchpoints: [tiktok('Hook Test 4'), meta(C), email('welcome_day1')] },
      { email: 'ben@example.com', touchpoints: [gads('Competitor Search'), email('welcome_day1')] },
      { email: 'eva@example.com', touchpoints: [meta(C), email('nurture_1')] },
      { email: 'sol@example.com', touchpoints: [meta(C), meta(R)] },
      { email: 'max@example.com', touchpoints: [meta(C), meta(R)] },
      { email: 'omar@example.com', touchpoints: [meta(C), meta(R)] },
      { email: 'jen@example.com', touchpoints: [meta(R), call('Discovery Call')] },
      { email: 'pat@example.com', touchpoints: [meta(C)] }
    ]
  };
})();
