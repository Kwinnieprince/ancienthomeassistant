/* ES5 navigation preferences: local to this browser, never dashboard data. */
(function (root) {
  'use strict';
  function Navigation(app, sidebar, toggle, backdrop, recall, store) {
    var saved = recall('navigation', {}) || {}, hiddenSidebar = saved.sidebar === true,
      hiddenTopbar = saved.topbar === true, opened = false, editing = false;
    function apply() {
      app.className = (hiddenSidebar && !editing ? 'hide-sidebar ' : '') +
        (hiddenTopbar && !editing ? 'hide-topbar ' : '') + (opened && !editing ? 'navigation-open' : '');
      sidebar.className = 'sidebar' + (opened && !editing ? ' open' : '');
      toggle.hidden = editing || !(hiddenSidebar || hiddenTopbar);
      toggle.setAttribute('aria-expanded', String(opened && !editing));
      toggle.setAttribute('aria-label', opened ? 'Hide navigation' : 'Show navigation');
      backdrop.hidden = !opened || editing;
    }
    this.preferences = function () { return { sidebar: hiddenSidebar, topbar: hiddenTopbar }; };
    this.configure = function (sidebarHidden, topbarHidden) {
      hiddenSidebar = sidebarHidden === true; hiddenTopbar = topbarHidden === true;
      store('navigation', this.preferences()); opened = false; apply();
    };
    this.close = function () { opened = false; apply(); };
    this.toggle = function () { opened = !opened; apply(); };
    this.setEditing = function (value) { if (editing === (value === true)) { return; } editing = value === true; opened = false; apply(); };
    apply();
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = Navigation; }
  else { root.AncientNavigation = Navigation; }
}(this));
