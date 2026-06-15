# Research notebook site

A hand-rolled GitHub Pages site: a research notebook of projects, presentations,
and writing, plus personal info. No framework, no build pipeline — just folders,
one manifest, and a tiny script.

## Principles

- **One folder per piece, named by a permanent slug.** The URL is the folder
  (`/projects/who-picked-the-headphones/`). Slugs never change, even when
  content does — dates, categories, and versions live in metadata, not paths.
- **Every piece is self-contained.** Its `index.html` references only files
  inside its own folder (`./img/...`), so a piece can be moved, copied, or
  snapshotted as a unit.
- **`manifest.json` is the single source of truth** for what exists: slug,
  title, description, date, tags (newest first).
- **Pieces keep their own bespoke design.** The only site-wide intrusion is one
  line: `<script src="/nav.js" defer></script>`, which injects a corner nav
  (home / older / newer) into an isolated shadow root.
- **Two pages in the top nav.** The chrome is just the wordmark (home) and
  About. The front page (`index.html`) shows the most recent pieces plus a
  "Writing" card linking to the newsletter; the full project list lives in
  `projects/index.html`, reached via the "All projects →" link at the bottom of
  the front page rather than a top-nav item.
- **Bust the stylesheet cache on change.** Shared pages link
  `assets/site.css?v=N`. Bump `N` whenever you edit `site.css` so browsers don't
  serve a stale copy.

## Layout

```
manifest.json        what exists (newest first) — edit this when adding a piece
build.mjs            regenerates index lists from the manifest
nav.js               runtime nav overlay for project pages
assets/site.css      shared chrome for index / about / projects / 404 pages
index.html           front page: piece list (between pieces markers) + Writing card
projects/index.html  full project list (same markers) — overflow past the front page
projects/<slug>/     one self-contained folder per piece
about/  404.html
.nojekyll            serve files as-is; no Jekyll processing
```

## Adding a piece

1. Create `projects/<slug>/` with an `index.html`; keep all its assets inside
   the folder, referenced by relative paths.
2. Add `<script src="/nav.js" defer></script>` before `</body>`.
3. Add an entry at the appropriate position in `manifest.json` (newest first).
4. Run `node build.mjs` to refresh the index pages.

To freeze a citable version of a piece, copy its folder to
`projects/<slug>/v1/` and link it from the living page.

## Preview locally

```
python3 -m http.server 8080
```

then open http://localhost:8080/. (Pages must be served, not opened as
`file://`, for nav.js's manifest fetch to work.)

Note: `python3 -m http.server` does **not** serve `404.html` for unknown paths —
it returns its own bare "Error code: 404" page. The custom 404 only appears on
GitHub Pages (which serves `/404.html` automatically) or any server with custom
error-page support, so a bad URL looking generic locally is expected, not a bug.

## Publishing

1. Create a GitHub repo named `<username>.github.io` and push this directory
   to `main`.
2. Repo Settings → Pages → deploy from branch `main`, root `/`.
3. Update `site.url` in `manifest.json`.
4. Optional but recommended: add a custom domain (Settings → Pages → custom
   domain, which commits a `CNAME` file) so shared links never depend on GitHub.
