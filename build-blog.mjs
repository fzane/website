// Builds the blog from the canonical Markdown corpus in blogposts-md/ into
// static HTML under blogposts/:
//   blogposts/index.html          — card list of every post, newest first
//   blogposts/<slug>/index.html   — one self-contained reading page per post
// Run after editing the corpus:  node build-blog.mjs
//
// Design notes:
//   • Zero dependencies — the Markdown→HTML converter below is hand-rolled,
//     matching the site's "no framework, no pipeline" ethos.
//   • Source of truth is each .md's YAML frontmatter (title/date/description,
//     optional subtitle) plus its body. The slug is the filename minus the
//     YYYY-MM-DD- date prefix and .md extension.
//   • Prev/next links are baked into each page at build time, so the blog is
//     independent of manifest.json and nav.js and leaves the project pages
//     untouched.
//   • Pages reuse the shared chrome in assets/site.css (the same .prose reading
//     style the About page uses). Bump the ?v= below if site.css changes.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const SRC = 'blogposts-md';
const OUT = 'blogposts';
const CSS_V = 4; // keep in sync with assets/site.css?v=N

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const fmtDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso).trim());
  return m ? `${MONTHS[+m[2] - 1]} ${+m[3]}, ${m[1]}` : iso;
};
const fmtMonth = (iso) => {
  const m = /^(\d{4})-(\d{2})/.exec(String(iso).trim());
  return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : iso;
};

// ── HTML escaping ────────────────────────────────────────────────────────
// The corpus already contains named HTML entities (e.g. &rarr;), so escape a
// lone & only when it does not begin a valid entity.
const esc = (s) => String(s)
  .replace(/&(?!#\d+;|#x[0-9a-fA-F]+;|[a-zA-Z][a-zA-Z0-9]*;)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

// ── inline Markdown: code, links, bold, italic ─────────────────────────────
function inline(text) {
  let s = esc(text);
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `CODE${codes.push(`<code>${c}</code>`) - 1}CODE`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, t, href) => `<a class="link" href="${href}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_([^_\s][^_]*?)_(?=[^\w]|$)/g, '$1<em>$2</em>');
  s = s.replace(/CODE(\d+)CODE/g, (_, i) => codes[+i]);
  return s;
}

// ── block Markdown → HTML ─────────────────────────────────────────────────
const isBlank = (l) => l.trim() === '';
const isHr = (l) => /^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(l);
const isHeading = (l) => /^#{1,6}\s+/.test(l);
const isQuote = (l) => /^\s{0,3}>/.test(l);
const listItem = (l) => /^\s{0,3}([-*])\s+(.*)$/.exec(l) || /^\s{0,3}(\d+)\.\s+(.*)$/.exec(l);
const isOrdered = (l) => /^\s{0,3}\d+\.\s+/.test(l);
const isListItem = (l) => !!listItem(l) && !isHr(l);

function render(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i++; continue; }

    if (isHr(line)) { out.push('<hr>'); i++; continue; }

    if (isHeading(line)) {
      const m = /^(#{1,6})\s+(.*)$/.exec(line);
      const lvl = Math.min(m[1].length + 1, 4); // # → h2 (h1 is the page title)
      out.push(`<h${lvl}>${inline(m[2].replace(/\s+#*\s*$/, ''))}</h${lvl}>`);
      i++; continue;
    }

    if (isQuote(line)) {
      const buf = [];
      while (i < lines.length && (isQuote(lines[i]) || (buf.length && isBlank(lines[i]) && isQuote(lines[i + 1] || '')))) {
        buf.push(lines[i].replace(/^\s{0,3}>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>\n${render(buf.join('\n'))}\n</blockquote>`);
      continue;
    }

    if (isListItem(line)) {
      const ordered = isOrdered(line);
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        if (isListItem(l)) { items.push(listItem(l)[2]); i++; }
        else if (isBlank(l) && isListItem(lines[i + 1] || '')) { i++; } // loose list gap
        else if (!isBlank(l) && !isHeading(l) && !isHr(l) && !isQuote(l) && items.length) {
          items[items.length - 1] += ' ' + l.trim(); i++; // wrapped continuation
        } else break;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>\n${items.map((t) => `  <li>${inline(t)}</li>`).join('\n')}\n</${tag}>`);
      continue;
    }

    // paragraph
    const buf = [];
    while (i < lines.length && !isBlank(lines[i]) && !isHeading(lines[i])
      && !isHr(lines[i]) && !isQuote(lines[i]) && !isListItem(lines[i])) {
      buf.push(lines[i].trim()); i++;
    }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}

// ── frontmatter ────────────────────────────────────────────────────────────
function parse(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  const meta = {};
  let body = raw;
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
      if (kv) { try { meta[kv[1]] = JSON.parse(kv[2]); } catch { meta[kv[1]] = kv[2].replace(/^"|"$/g, ''); } }
    }
    body = raw.slice(m[0].length);
  }
  return { meta, body };
}

// ── shared chrome ───────────────────────────────────────────────────────────
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
  + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
  + '<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..600;1,400..600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400..600&display=swap" rel="stylesheet">';

const socials = '<div class="social">'
  + '<a href="mailto:francis@francis-zane.com" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2L12 11.7 19.4 7H4.6ZM20 8.5l-7.4 4.7a1 1 0 0 1-1.2 0L4 8.5V17h16V8.5Z"/></svg></a>'
  + '<a href="https://www.linkedin.com/in/francis-zane-ba75521/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.5h3.1V21H3.4V8.5Zm5.06 0h2.97v1.71h.04c.41-.78 1.43-1.6 2.94-1.6 3.14 0 3.72 2.07 3.72 4.76V21h-3.1v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H8.46V8.5Z"/></svg></a>'
  + '<a href="https://throughthecontextwindow.substack.com" target="_blank" rel="noopener" aria-label="Substack"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v2.6H4V4Zm0 4.6h16v2.6H4V8.6Zm0 4.6h16L12 20.4 4 13.2Z"/></svg></a>'
  + '</div>';

const header = (root) => `  <div style="width:100%;padding:30px var(--pad-x) 0">
    <div style="max-width:1080px;margin:0 auto">
      <header class="site">
        <a class="mark" href="${root}">FZ<b>*</b></a>
        <div class="site-right">
          <nav class="nav">
            <a href="${root}about/" style="--nav-c:var(--moss)">About</a>
          </nav>
          ${socials}
        </div>
      </header>
    </div>
  </div>`;

// ── read + sort posts (newest first) ────────────────────────────────────────
const posts = readdirSync(SRC).filter((f) => f.endsWith('.md')).map((file) => {
  const { meta, body } = parse(readFileSync(path.join(SRC, file), 'utf8'));
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  return { file, slug, meta, body, date: meta.date || file.slice(0, 10) };
}).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

// ── per-post pages ──────────────────────────────────────────────────────────
if (existsSync(OUT)) {
  for (const d of readdirSync(OUT, { withFileTypes: true }))
    if (d.isDirectory()) rmSync(path.join(OUT, d.name), { recursive: true, force: true });
} else mkdirSync(OUT, { recursive: true });

posts.forEach((p, idx) => {
  const newer = idx > 0 ? posts[idx - 1] : null;        // newer = earlier in list
  const older = idx < posts.length - 1 ? posts[idx + 1] : null;
  const subtitle = p.meta.subtitle
    ? `\n      <p class="post-sub">${inline(p.meta.subtitle)}</p>` : '';

  const navLinks = [];
  if (older) navLinks.push(`<a class="pn pn-older" href="../${older.slug}/"><span class="pn-dir">← Older</span><span class="pn-t">${esc(older.meta.title)}</span></a>`);
  if (newer) navLinks.push(`<a class="pn pn-newer" href="../${newer.slug}/"><span class="pn-dir">Newer →</span><span class="pn-t">${esc(newer.meta.title)}</span></a>`);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.meta.title)} — Francis Zane</title>
<meta name="description" content="${escAttr(p.meta.description || '')}">
${FONTS}
<link rel="stylesheet" href="../../assets/site.css?v=${CSS_V}">
<style>
  body{background:var(--paper)}
  .post{max-width:none;padding:0}
  .post-head{margin-top:64px}
  .post-kicker{font-family:var(--serif);font-style:italic;font-size:16px;color:var(--clay);margin:0 0 14px}
  .post-title{font-family:var(--serif);font-weight:500;font-size:clamp(34px,5.2vw,56px);
    line-height:1.05;letter-spacing:-.02em;color:var(--ink);margin:0;text-wrap:balance}
  .post-sub{font-family:var(--serif);font-style:italic;font-weight:400;
    font-size:clamp(18px,2.2vw,23px);line-height:1.4;color:var(--muted);margin:16px 0 0;max-width:44ch}
  .post-body{margin-top:44px}
  .post-body p{margin:0 0 1.15em;max-width:64ch}
  .post-body h2{font-family:var(--serif);font-weight:500;font-size:clamp(24px,3vw,32px);
    line-height:1.2;letter-spacing:-.01em;color:var(--ink);margin:48px 0 14px;text-wrap:balance}
  .post-body h3{font-family:var(--serif);font-weight:500;font-size:clamp(20px,2.4vw,25px);
    line-height:1.25;color:var(--ink);margin:38px 0 12px}
  .post-body h4{font-family:var(--sans);font-weight:700;font-size:17px;color:var(--ink);margin:30px 0 10px}
  .post-body ul,.post-body ol{margin:0 0 1.15em;padding-left:1.4em;max-width:64ch}
  .post-body li{margin:0 0 .5em;color:var(--body)}
  .post-body strong{color:var(--ink);font-weight:700}
  .post-body blockquote{margin:28px 0;padding-left:24px;border-left:2px solid var(--clay);
    color:var(--muted);max-width:60ch}
  .post-body blockquote p{font-family:var(--serif);font-style:italic;font-size:19px;line-height:1.6}
  .post-body blockquote strong{color:var(--ink);font-style:normal}
  .post-body hr{border:none;border-top:1px solid var(--line);margin:44px auto;width:180px}
  .post-body code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;
    background:var(--well);padding:1px 5px;border-radius:4px}
  .post-body a{color:var(--blue);font-weight:700;text-decoration:none}
  .post-body a:hover{text-decoration:underline;text-underline-offset:3px}
  .post-nav{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;
    border-top:1px solid var(--line);margin-top:72px;padding-top:26px}
  .pn{display:flex;flex-direction:column;gap:4px;text-decoration:none;max-width:46%}
  .pn-newer{margin-left:auto;text-align:right}
  .pn-dir{font-size:13px;color:var(--muted)}
  .pn-t{font-family:var(--serif);font-size:18px;color:var(--ink);line-height:1.25}
  .pn:hover .pn-t{color:var(--clay)}
  .back{display:inline-block;margin-top:8px;font-size:14.5px}
  @media(max-width:560px){.pn{max-width:100%}.pn-newer{text-align:left;margin-left:0}}
</style>
</head>
<body>

${header('../../')}

  <main class="page">
    <article class="post">
      <div class="post-head">
        <p class="post-kicker">${fmtDate(p.date)}</p>
        <h1 class="post-title">${esc(p.meta.title)}</h1>${subtitle}
      </div>
      <div class="post-body">
${render(p.body)}
      </div>
      <nav class="post-nav">
${navLinks.map((l) => '        ' + l).join('\n')}
      </nav>
      <p><a class="link back" href="../">← All writing</a></p>
    </article>
  </main>

</body>
</html>
`;
  mkdirSync(path.join(OUT, p.slug), { recursive: true });
  writeFileSync(path.join(OUT, p.slug, 'index.html'), html);
});

// ── index page (card list) ───────────────────────────────────────────────────
const rows = posts.map((p) => `      <a class="row nothumb" href="${p.slug}/">
            <span class="rbody">
              <span class="rtitle">${esc(p.meta.title)}</span>
              <span class="rdesc">${esc(p.meta.description || '')}</span>
              <span class="rmeta"><span class="rdate">${fmtMonth(p.date)}</span></span>
            </span>
          </a>`).join('\n');

const index = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Writing — Francis Zane</title>
<meta name="description" content="Essays on cognitive design and working with AI, by Francis Zane. Originally published on Through the Context Window.">
${FONTS}
<link rel="stylesheet" href="../assets/site.css?v=${CSS_V}">
</head>
<body class="warm">

${header('../')}

  <main>

    <section class="band" style="padding-top:clamp(64px,10vh,104px);padding-bottom:clamp(40px,6vh,64px)">
      <div class="band-inner">
        <h1 class="page-h1">Writing</h1>
        <p class="page-lead">Essays on cognitive design and working with AI — from the newsletter <a class="link" href="https://throughthecontextwindow.substack.com" target="_blank" rel="noopener">Through the Context Window</a>.</p>
      </div>
    </section>

    <section class="band band-raised" style="padding-top:clamp(40px,6vh,64px)">
      <div class="band-inner">
        <div class="rows">
${rows}
        </div>
      </div>
    </section>

  </main>

</body>
</html>
`;
writeFileSync(path.join(OUT, 'index.html'), index);

console.log(`built ${posts.length} posts + index into ${OUT}/`);
