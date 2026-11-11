'use strict';
var assert = require('assert');
var Navigation = require('../static/navigation.js');
function element() { return { className: '', hidden: false, attributes: {}, setAttribute: function (k, v) { this.attributes[k] = v; } }; }
function fixture(saved) {
  var app = element(), sidebar = element(), toggle = element(), backdrop = element(), stored;
  var nav = new Navigation(app, sidebar, toggle, backdrop, function () { return saved; }, function (key, value) { stored = value; });
  return { nav: nav, app: app, sidebar: sidebar, toggle: toggle, backdrop: backdrop, saved: function () { return stored; } };
}
var f = fixture({});
assert.equal(f.toggle.hidden, true);
f.nav.configure(true, true);
assert.deepEqual(f.saved(), { sidebar: true, topbar: true });
assert(f.app.className.indexOf('hide-sidebar') >= 0);
assert(f.app.className.indexOf('hide-topbar') >= 0);
assert.equal(f.toggle.hidden, false);
f.nav.toggle();
assert.equal(f.backdrop.hidden, false);
assert.equal(f.toggle.attributes['aria-expanded'], 'true');
f.nav.setEditing(false); // polling/rerender must not close an open overlay
assert.equal(f.backdrop.hidden, false);
f.nav.close();
assert.equal(f.backdrop.hidden, true);
f.nav.setEditing(true);
assert.equal(f.app.className.indexOf('hide-sidebar'), -1);
assert.equal(f.toggle.hidden, true);
f.nav.setEditing(false);
assert(f.app.className.indexOf('hide-sidebar') >= 0);
var restored = fixture(f.saved());
assert.deepEqual(restored.nav.preferences(), { sidebar: true, topbar: true });
restored.nav.configure(false, true);
assert.equal(restored.app.className.indexOf('hide-sidebar'), -1);
assert(restored.app.className.indexOf('hide-topbar') >= 0);
restored.nav.configure(true, false);
assert(restored.app.className.indexOf('hide-sidebar') >= 0);
assert.equal(restored.app.className.indexOf('hide-topbar'), -1);
assert.deepEqual(fixture('bad saved value').nav.preferences(), { sidebar: false, topbar: false });
console.log('Navigation: preferences, restoration, edit mode, polling and dismissal pass.');
