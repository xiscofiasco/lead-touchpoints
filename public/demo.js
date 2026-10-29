// Made up demo journeys. Nothing here is real lead data.
(function () {
  var T = function (kind, label, detail) { return { kind: kind, label: label, detail: detail, tip: detail }; };
  var meta = function (d) { return T('meta', 'Meta', d); };
  var gads = function (d) { return T('google', 'Google Ads', d); };
  var tiktok = function (d) { return T('tiktok', 'TikTok', d); };
  var reddit = function (d) { return T('reddit', 'Reddit', d); };
  var snap = function (d) { return T('snapchat', 'Snapchat', d); };
  var applovin = function (d) { return T('applovin', 'AppLovin', d); };
  var youtube = function (d) { return T('youtube', 'YouTube Ads', d); };
  var linkedin = function (d) { return T('linkedin', 'LinkedIn Ads', d); };
  var pinterest = function (d) { return T('pinterest', 'Pinterest Ads', d); };
  var xads = function (d) { return T('x', 'X Ads', d); };
  var affiliate = function (d) { return T('affiliate', 'Affiliate', d); };
  var email = function (d) { return T('organic', 'Email', d); };
  var sms = function (d) { return T('organic', 'SMS', d); };
  var chat = function (d) { return T('organic', 'Manychat', d); };
  var gorg = function () { return T('organic', 'Google organic', 'google_organic'); };
  var igorg = function () { return T('organic', 'Instagram organic', 'instagram_organic'); };
  var call = function (d) { return T('call', 'Booked call', d); };
  var buy = function (d) { return T('purchase', 'Purchase made', d); };

  window.DEMO = {
    demo: true,
    skippedNoAttribution: 4,
    leads: [
      { email: 'sarah@example.com', touchpoints: [meta('Cold UGC Video V2'), email('welcome_day1'), meta('Retargeting Carousel'), call('Strategy Call'), email('proposal_followup'), buy('$2,222 · Annual Program')] },
      { email: 'dana@example.com', touchpoints: [gads('Brand Search Exact'), meta('Retargeting Carousel'), email('promo_oct'), call('Strategy Call'), buy('$1,497 · Coaching')] },
      { email: 'nina@example.com', touchpoints: [youtube('Pre roll 30s'), gorg(), email('nurture_2'), call('Discovery Call'), buy('$3,000 · VIP Day')] },
      { email: 'kai@example.com', touchpoints: [pinterest('Idea Pin 7'), meta('Cold UGC Video V2'), igorg(), sms('cart_recovery'), buy('$67 · Workbook')] },
      { email: 'ruth@example.com', touchpoints: [linkedin('Case Study Lead Gen'), email('webinar_reminder'), call('Demo Call'), buy('$5,400 · Team Plan')] },
      { email: 'tom@example.com', touchpoints: [affiliate('Partner: GrowthPod'), email('welcome_day1'), email('day3_story'), buy('$497 · Core Program')] },
      { email: 'chris@example.com', touchpoints: [tiktok('Hook Test 4'), igorg(), email('welcome_day1'), buy('$97 · Starter Kit')] },
      { email: 'mike@example.com', touchpoints: [gorg(), email('nurture_3'), email('promo_oct'), buy('$1,063 · Starter')] },
      { email: 'alex@example.com', touchpoints: [chat('Spring Giveaway'), email('day2_story'), email('day4_offer'), buy('$197 · Mini Course')] },
      { email: 'lee@example.com', touchpoints: [reddit('r/entrepreneur Promoted'), snap('Story Ad 2'), email('nurture_1')] },
      { email: 'omar@example.com', touchpoints: [applovin('Playable Ad 3'), meta('Cold UGC Video V2'), email('welcome_day1')] },
      { email: 'eva@example.com', touchpoints: [xads('Thread Promo'), email('nurture_1'), email('nurture_3'), email('promo_oct')] },
      { email: 'liam@example.com', touchpoints: [meta('Cold UGC Video V2'), email('welcome_day1'), buy('$1,063 · Starter')] },
      { email: 'zoe@example.com', touchpoints: [meta('Cold UGC Video V2'), email('welcome_day1'), buy('$197 · Mini Course')] },
      { email: 'ben@example.com', touchpoints: [gads('Brand Search Exact'), email('welcome_day1'), email('day2_story')] },
      { email: 'ivy@example.com', touchpoints: [gads('Competitor Search'), email('welcome_day1'), email('day2_story')] },
      { email: 'max@example.com', touchpoints: [meta('Cold UGC Video V2'), meta('Retargeting Carousel')] },
      { email: 'sol@example.com', touchpoints: [meta('Cold UGC Video V2'), meta('Retargeting Carousel')] },
      { email: 'jen@example.com', touchpoints: [meta('Retargeting Carousel'), call('Discovery Call')] },
      { email: 'pat@example.com', touchpoints: [meta('Cold UGC Video V2')] }
    ]
  };
})();
