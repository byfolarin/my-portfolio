// Tracks how the visitor moves through the site, so inner pages can decide
// whether a "← back" link is earned:
// - count: route changes this session (0 = deep link / first page)
// - viaNav: whether the LAST route change came from the site nav — the nav
//   is its own wayfinding, so those transitions don't get a back link
export const navState = {
  count: 0,
  viaNav: false,
  pendingNavClick: false,
};
