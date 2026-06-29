/* Site-wide nav overlay for project pages.
   Each self-contained page adds exactly one line:  <script src="../../nav.js" defer></script>
   The overlay is rendered inside a shadow root so the page's CSS and the nav's CSS
   cannot affect each other, and it is position:fixed so it occupies no space in the
   page's layout. White text + mix-blend-mode:difference keeps it legible on light
   and dark backgrounds without knowing the page's palette. If the manifest can't
   be fetched (e.g. file:// preview), the home link still renders. */
(function () {
  if (window.__siteNav) return;
  window.__siteNav = true;

  var script = document.currentScript;
  var baseUrl = script ? new URL('.', script.src) : new URL('./', location.href);
  var href = function (p) { return new URL(p, baseUrl).href; };
  var pathOf = function (p) { return new URL(p, baseUrl).pathname; };

  var host = document.createElement('div');
  host.setAttribute('data-site-nav', '');
  if (document.querySelector('.story-rail')) host.setAttribute('data-left-rail', '');
  var root = host.attachShadow({ mode: 'open' });

  var style = document.createElement('style');
  style.textContent =
    ':host{all:initial}' +
    '.corner{position:fixed;z-index:2147483000;mix-blend-mode:difference;' +
      'font:13px/1.3 "Atkinson Hyperlegible",-apple-system,"Segoe UI",sans-serif}' +
    '.corner a{color:#fff;text-decoration:none;opacity:.55;transition:opacity .25s;' +
      'display:inline-block;max-width:34ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.corner a:hover,.corner a:focus-visible{opacity:1}' +
    '.home{top:18px;left:20px}' +
    '.older{bottom:18px;left:20px}' +
    '.newer{bottom:18px;right:20px}' +
    ':host([data-left-rail]) .home{left:320px}' +
    ':host([data-left-rail]) .older{left:320px}' +
    '@media (max-width:900px){' +
      ':host([data-left-rail]) .home{top:auto;bottom:42px;left:20px}' +
      ':host([data-left-rail]) .older{bottom:18px;left:20px}' +
    '}' +
    '@media print{.corner{display:none}}';
  root.appendChild(style);

  var corner = function (cls, href, text, full, rel) {
    var div = document.createElement('div');
    div.className = 'corner ' + cls;
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    if (full) a.title = full;
    if (rel) a.rel = rel;
    div.appendChild(a);
    root.appendChild(div);
    return a;
  };

  var home = corner('home', href('index.html'), '⌂ Francis Zane');
  if (document.body) document.body.appendChild(host);

  fetch(href('manifest.json'))
    .then(function (r) { return r.json(); })
    .then(function (m) {
      var norm = function (p) { return p.replace(/index\.html$/, '').replace(/\/$/, '/'); };
      var here = norm(location.pathname);
      var pieces = m.pieces || [];
      var i = -1;
      for (var k = 0; k < pieces.length; k++) {
        if (norm(pathOf(pieces[k].slug)) === here) { i = k; break; }
      }
      // manifest is ordered newest-first
      var newer = i > 0 ? pieces[i - 1] : null;
      var older = (i >= 0 && i < pieces.length - 1) ? pieces[i + 1] : null;

      home.textContent = '⌂ ' + (m.site && m.site.title || 'Francis Zane');
      if (older) corner('older', href(older.slug), '← ' + older.title, 'older: ' + older.title, 'prev');
      if (newer) corner('newer', href(newer.slug), newer.title + ' →', 'newer: ' + newer.title, 'next');
    })
    .catch(function () {});
})();
