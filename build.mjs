// Regenerates the piece lists in index.html and projects/index.html from
// manifest.json. Run after editing the manifest:  node build.mjs
// The manifest is the single source of truth for what exists on the site;
// nav.js reads it at runtime for prev/next links, this script bakes it into
// the static index pages. Pieces are listed in manifest order (newest
// first); "thumb" is an optional image path rendered beside the row.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Dates live in the manifest as ISO "YYYY-MM"; render them written-out.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const fmtDate = d => {
  const m = /^(\d{4})-(\d{2})$/.exec(String(d).trim());
  return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : esc(d);
};

const relUrl = (fromFile, target) => {
  const fromDir = path.posix.dirname(fromFile);
  const cleanTarget = String(target).replace(/^\/+/, '');
  const hasTrailingSlash = cleanTarget.endsWith('/');
  const relative = path.posix.relative(fromDir === '.' ? '' : fromDir, cleanTarget);
  const url = relative || '.';
  return hasTrailingSlash && !url.endsWith('/') ? `${url}/` : url;
};

const row = (p, i, fromFile) => {
  const num = String(i + 1).padStart(2, '0');
  const thumb = p.thumb
    ? `
            <span class="rthumb"><img src="${esc(relUrl(fromFile, p.thumb))}" alt="" loading="lazy"></span>`
    : '';
  return `      <a class="row${p.thumb ? '' : ' nothumb'}" href="${esc(relUrl(fromFile, p.slug))}">
            <span class="rbody">
              <span class="rtag">${esc(p.tag || `project ${num}`)}</span>
              <span class="rtitle">${esc(p.title)}</span>
              <span class="rdesc">${esc(p.description)}</span>
              <span class="rmeta"><span class="rdate">${fmtDate(p.date)}</span></span>
            </span>${thumb}
          </a>`;
};

for (const file of ['index.html', 'projects/index.html']) {
  const src = readFileSync(file, 'utf8');
  if (!src.includes('<!-- pieces:start -->')) {
    console.warn(`skipped ${file}: no pieces markers`);
    continue;
  }
  const list = manifest.pieces.map((p, i) => row(p, i, file)).join('\n');
  const out = src.replace(
    /(<!-- pieces:start -->)[\s\S]*?(<!-- pieces:end -->)/,
    `$1\n${list}\n      $2`
  );
  writeFileSync(file, out);
  console.log(`updated ${file} (${manifest.pieces.length} pieces)`);
}
