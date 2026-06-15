/* Site-wide nav overlay for project pages.
   Each self-contained page adds exactly one line:  <script src="/nav.js" defer></script>
   The overlay is rendered inside a shadow root so the page's CSS and the nav's CSS
   cannot affect each other, and it is position:fixed so it occupies no space in the
   page's layout. White text + mix-blend-mode:difference keeps it legible on light
   and dark backgrounds without knowing the page's palette. Fails silently: if the
   manifest can't be fetched (e.g. file:// preview), the page is simply unchanged. */
(function () {
  if (window.__siteNav) return;
  window.__siteNav = true;

  fetch('/manifest.json')
    .then(function (r) { return r.json(); })
    .then(function (m) {
      var norm = function (p) { return p.replace(/index\.html$/, ''); };
      var here = norm(location.pathname);
      var pieces = m.pieces || [];
      var i = -1;
      for (var k = 0; k < pieces.length; k++) {
        if (norm(pieces[k].slug) === here) { i = k; break; }
      }
      // manifest is ordered newest-first
      var newer = i > 0 ? pieces[i - 1] : null;
      var older = (i >= 0 && i < pieces.length - 1) ? pieces[i + 1] : null;

      var host = document.createElement('div');
      host.setAttribute('data-site-nav', '');
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
      };

      corner('home', '/', '⌂ ' + (m.site && m.site.title || 'index'));
      if (older) corner('older', older.slug, '← ' + older.title, 'older: ' + older.title, 'prev');
      if (newer) corner('newer', newer.slug, newer.title + ' →', 'newer: ' + newer.title, 'next');

      if (document.body) document.body.appendChild(host);
    })
    .catch(function () {});
})();
