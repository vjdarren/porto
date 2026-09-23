# SEO and Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make valentinusjavier.com rank for VJ's name and give every page real, crawlable HTML with its own title, description, canonical URL and structured data.

**Architecture:** Keep the Vite + React SPA. A second, server-side Vite build renders every route to HTML at build time (`scripts/prerender.mjs`), writing `dist/<route>.html`, `404.html`, `sitemap.xml` and `robots.txt`; the client hydrates that markup. `src/seo.js` is the single source for per-page metadata, used by both the prerender step and the client's `useDocumentMeta`. Vercel serves the files with clean URLs and real 404s.

**Tech Stack:** Vite 8, React 19 (`react-dom/server` `renderToString`, `hydrateRoot`), React Router 7 (`StaticRouter`), Node 22 built-in test runner (`node --test`), no new dependencies.

**Spec:** Conversation of 23 Sep 2026. VJ approved: positioning "Business & Product Analyst · Computing Graduate (First Class)"; full prerender; CV `noindex`; build on `fix/content-accuracy`.

## Global Constraints

- No em dashes in any site copy or commit message (VJ's hard rule).
- No new npm dependencies. `npx serve` and `npx lighthouse` are verification-only, never in package.json.
- Canonical host: `https://www.valentinusjavier.com` (apex and http already 301 there).
- Positioning line, verbatim: `Business & Product Analyst · Computing Graduate (First Class)`.
- Home `<title>`, verbatim: `Valentinus Javier Darren Sebastian · Business & Product Analyst · Computing Graduate (First Class)`.
- Descriptions at most 160 characters.
- No visible design change except what a task names. Fonts must render exactly as they do on the live site today (Satoshi never loads there; keep it that way and flag it).
- Do not restyle; do not rewrite page copy beyond the Toss `subtitle` used in its title.

## Review Focus

1. A path with a trailing slash or a typo (`/project/toss/`, `/project/nope`): must not hydrate mismatched markup or show a blank page. Covered by the `data-route` guard in `main.jsx` (Task 2) and the browser hydration check.
2. Client-side navigation after hydration (card click, back button): title and description must follow the page. Covered by Task 2 browser check.
3. Asset URLs inside prerendered HTML (CV PDF, images) must exist in `dist/` (SSR and client builds hash the same content). Covered by Task 2 test `referenced assets exist`.
4. Characters that need escaping in head tags (`&`, `"`, `£`, `'`) must not break the HTML or JSON-LD. Covered by Task 2 JSON-LD parse test and title match on pages whose titles contain `&` and `£`.
5. The CV PDF must carry `X-Robots-Tag: noindex` in production. Not testable locally (Vercel-only header); verified post-deploy with `curl -I` in the handoff checklist, config pinned by Task 3 test.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/seo.js` (new) | Site constants, per-page title/description, JSON-LD, page list |
| `src/data.js` | Add `PROFILE.linkedin`, `PROFILE.github`, `ALL_PROJECTS`, Toss `subtitle` |
| `src/hooks.js` | `useDocumentMeta({ title, description })` reads defaults from `seo.js` |
| `src/pages/ProjectDetail.jsx`, `src/pages/NotFound.jsx` | Pass `projectMeta()` / `notFoundMeta()` |
| `src/navLinks.js`, `src/pages/Home.jsx` | Social URLs from `PROFILE`; `ALL_PROJECTS` from data |
| `src/components/AboutSection.jsx` | Photo from `public/valentinus-javier.webp`, alt = full name |
| `src/entry-server.js` (new) | `render(url)` plus re-exports of `seo.js` for the prerender step |
| `src/main.jsx` | `hydrateRoot` when `#root[data-route]` matches the URL, else `createRoot` |
| `scripts/prerender.mjs` (new) | Writes per-route HTML, `404.html`, `sitemap.xml`, `robots.txt` |
| `index.html` | `<!--app-head-->` placeholder, noscript reveal fallback, first-screen reveal script, font preloads |
| `vercel.json` | Clean URLs, no trailing slash, no catch-all rewrite, PDF `noindex`, font caching |
| `package.json` | `build` = client build, SSR build, prerender; `test` = build then `node --test` |
| `tests/content.test.mjs`, `tests/seo.test.mjs` (new) | Durable content rules; prerender output |
| `public/fonts/*.woff2` (new), `src/index.css` | Self-hosted fonts, `@starting-style` for first-screen reveal |

---

### Task 1: One source for page metadata

**Files:**
- Create: `src/seo.js`, `tests/content.test.mjs`, `tests/seo.test.mjs` (unit part)
- Modify: `src/data.js`, `src/hooks.js`, `src/pages/ProjectDetail.jsx`, `src/pages/NotFound.jsx`, `src/navLinks.js`, `src/pages/Home.jsx`, `src/components/AboutSection.jsx`, `package.json`
- Move: `src/assets/darrenfinal.webp` to `public/valentinus-javier.webp`

**Interfaces:**
- Produces: `SITE_URL`, `PERSON_NAME`, `SHORT_NAME`, `POSITIONING`, `OG_IMAGE`, `HOME_META {title, description}`, `trimDescription(s)`, `projectMeta(p)`, `notFoundMeta(what?)`, `canonical(path)`, `pages() -> [{path, title, description, jsonLd}]`; `ALL_PROJECTS`; `useDocumentMeta({ title, description })`.

- [ ] **Step 1: Write the failing tests**

`tests/content.test.mjs`:
```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f)
  return statSync(p).isDirectory() ? walk(p) : /\.(js|jsx|css|html)$/.test(p) ? [p] : []
})
const files = [...walk(join(root, 'src')), join(root, 'index.html')]
const hits = (re) => files.flatMap((f) => readFileSync(f, 'utf8').split('\n')
  .flatMap((l, i) => (re.test(l) ? [`${f.slice(root.length)}:${i + 1}`] : [])))

test('no em dashes in site source', () => assert.deepEqual(hits(/—/), []))
test('no placeholder links', () => assert.deepEqual(hits(/href: '#'/), []))
```

`tests/seo.test.mjs` (unit part):
```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pages, HOME_META, projectMeta, trimDescription } from '../src/seo.js'
import { ALL_PROJECTS } from '../src/data.js'

test('home title leads with the full name and positioning', () => {
  assert.equal(HOME_META.title, 'Valentinus Javier Darren Sebastian · Business & Product Analyst · Computing Graduate (First Class)')
})
test('one page per project plus home, unique titles, short descriptions', () => {
  const ps = pages()
  assert.equal(ps.length, ALL_PROJECTS.length + 1)
  assert.equal(new Set(ps.map((p) => p.title)).size, ps.length)
  for (const p of ps) assert.ok(p.description.length <= 160, `${p.path} description ${p.description.length} chars`)
})
test('project titles carry the subtitle and the name', () => {
  for (const p of ALL_PROJECTS) {
    assert.ok(p.subtitle, `${p.slug} needs a subtitle for its title`)
    assert.equal(projectMeta(p).title, `${p.name}: ${p.subtitle} · Valentinus Javier`)
  }
})
test('long descriptions are cut on a word boundary', () => {
  const d = trimDescription('word '.repeat(60))
  assert.ok(d.length <= 160 && d.endsWith('…') && !d.includes(' …'))
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/*.test.mjs`
Expected: `seo.test.mjs` FAIL, cannot find module `../src/seo.js`; `content.test.mjs` PASS (it guards rules already met).

- [ ] **Step 3: Implement**

`src/data.js`: add to `PROFILE`: `linkedin: 'https://www.linkedin.com/in/valentinusjavier/'`, `github: 'https://github.com/vjdarren'`. Add to Toss: `subtitle: 'AI-Powered Food Waste Reduction Web App'` (VJ's own CV wording). After `GRID_PROJECTS`: `export const ALL_PROJECTS = [...PROJECTS, ...GRID_PROJECTS]`.

`src/seo.js`:
```js
/* =========================================================
   SEO. One source for every page's title, description,
   canonical URL and structured data. The prerender step
   writes these into each page's HTML; useDocumentMeta keeps
   the tab in step on client-side navigation.
   ========================================================= */
import { PROFILE, EDUCATION, ALL_PROJECTS } from './data.js'

export const SITE_URL = 'https://www.valentinusjavier.com'
export const PERSON_NAME = 'Valentinus Javier Darren Sebastian'
export const SHORT_NAME = 'Valentinus Javier'
export const POSITIONING = 'Business & Product Analyst · Computing Graduate (First Class)'
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const PROFILE_IMAGE = '/valentinus-javier.webp'

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const HOME_META = {
  title: `${PERSON_NAME} · ${POSITIONING}`,
  description: 'Business & Product Analyst and Computing graduate (First Class, University of Greenwich). Case studies in requirements analysis, product thinking and delivery.',
}

/* Search engines cut the snippet around 160 characters; trim on a word
   boundary so the tag never ends mid-word. */
export function trimDescription(s) {
  const d = s.trim()
  return d.length > 160 ? `${d.slice(0, 157).replace(/\s+\S*$/, '')}…` : d
}

export const canonical = (path) => `${SITE_URL}${path}`

export function projectMeta(p) {
  return {
    title: `${p.name}: ${p.subtitle} · ${SHORT_NAME}`,
    description: trimDescription(p.desc ?? p.context.desc),
  }
}

export function notFoundMeta(what = 'Page') {
  return { title: `${what} not found · ${SHORT_NAME}`, description: HOME_META.description }
}

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  alternateName: [SHORT_NAME, 'VJ'],
  description: POSITIONING,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${PROFILE_IMAGE}`,
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  alumniOf: EDUCATION.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
  sameAs: [PROFILE.linkedin, PROFILE.github],
}

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes })

function homeJsonLd() {
  return graph(
    { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`, name: PERSON_NAME, alternateName: SHORT_NAME, publisher: { '@id': PERSON_ID } },
    { '@type': 'ProfilePage', url: `${SITE_URL}/`, name: HOME_META.title, isPartOf: { '@id': WEBSITE_ID }, mainEntity: { '@id': PERSON_ID } },
    person,
  )
}

function projectJsonLd(p, path) {
  const image = p.visuals?.[0]?.src ? `${SITE_URL}${p.visuals[0].src}` : OG_IMAGE
  return graph(
    { '@type': 'CreativeWork', url: canonical(path), name: p.name, headline: p.subtitle, description: projectMeta(p).description, image, author: { '@id': PERSON_ID }, isPartOf: { '@id': WEBSITE_ID } },
    person,
  )
}

export function pages() {
  return [
    { path: '/', ...HOME_META, jsonLd: homeJsonLd() },
    ...ALL_PROJECTS.map((p) => {
      const path = `/project/${p.slug}`
      return { path, ...projectMeta(p), jsonLd: projectJsonLd(p, path) }
    }),
  ]
}
```

`src/hooks.js`: replace `BASE_TITLE`/`BASE_DESC` and `useDocumentMeta` with:
```js
/* Title and description for client-side navigation. Crawlers get the same
   values from the prerendered HTML; both come from seo.js. */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    const tag = document.querySelector('meta[name="description"]')
    tag?.setAttribute('content', description)
    return () => {
      document.title = HOME_META.title
      tag?.setAttribute('content', HOME_META.description)
    }
  }, [title, description])
}
```
with `import { HOME_META } from './seo'`.

`src/pages/ProjectDetail.jsx`: `useDocumentMeta(found ? projectMeta(found) : notFoundMeta('Project'))`.
`src/pages/NotFound.jsx`: `useDocumentMeta(notFoundMeta(what))`.
`src/navLinks.js` and the Home footer: use `PROFILE.github` / `PROFILE.linkedin`. `Home.jsx`: import `ALL_PROJECTS` instead of building it.
`AboutSection.jsx`: `git mv src/assets/darrenfinal.webp public/valentinus-javier.webp`; `<img src={PROFILE_IMAGE} alt={PROFILE.name} ...>` importing `PROFILE_IMAGE` from `../seo`.
`package.json`: `"test": "npm run build && node --test tests/*.test.mjs"`.

- [ ] **Step 4: Run to verify they pass**

Run: `node --test tests/*.test.mjs && npm run build && npm run lint`
Expected: all tests pass; build and lint clean.

- [ ] **Step 5: Commit** `feat(seo): one source for page titles, descriptions and structured data`

---

### Task 2: Prerender every route

**Files:**
- Create: `src/entry-server.js`, `scripts/prerender.mjs`
- Modify: `src/main.jsx`, `index.html`, `package.json`, `tests/seo.test.mjs` (output part)

**Interfaces:**
- Consumes: Task 1 `pages()`, `canonical()`, `notFoundMeta()`, `SITE_URL`, `OG_IMAGE`, `PERSON_NAME`.
- Produces: `dist/index.html`, `dist/project/<slug>.html`, `dist/404.html`, `dist/sitemap.xml`, `dist/robots.txt`; `#root[data-route]`.

- [ ] **Step 1: Write the failing test** (append to `tests/seo.test.mjs`)
```js
import { readFileSync, existsSync } from 'node:fs'
import { canonical } from '../src/seo.js'

const dist = new URL('../dist/', import.meta.url)
const read = (p) => readFileSync(new URL(p, dist), 'utf8')
const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

test('every page ships its own head and its content as HTML', () => {
  for (const p of pages()) {
    const html = read(fileFor(p.path))
    assert.equal((html.match(/<title>/g) || []).length, 1, p.path)
    assert.ok(html.includes(`<title>${esc(p.title)}</title>`), `${p.path} title`)
    assert.ok(html.includes(`<meta name="description" content="${esc(p.description)}" />`), `${p.path} description`)
    assert.ok(html.includes(`<link rel="canonical" href="${canonical(p.path)}" />`), `${p.path} canonical`)
    assert.ok(html.includes(`<meta property="og:url" content="${canonical(p.path)}" />`), `${p.path} og:url`)
    assert.ok(html.includes(`<div id="root" data-route="${p.path}"><`), `${p.path} prerendered root`)
    assert.ok(!html.includes('<!--app-head-->'), `${p.path} placeholder left`)
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.ok(ld['@graph'].some((n) => n['@type'] === 'Person'), `${p.path} Person`)
  }
  assert.ok(read('project/libra.html').includes('HC 434'))
  assert.ok(read('index.html').includes('Open to UK graduate roles'))
})

test('404 page is prerendered and kept out of the index', () => {
  const html = read('404.html')
  assert.ok(html.includes('not found'))
  assert.ok(html.includes('<meta name="robots" content="noindex" />'))
  assert.ok(!html.includes('rel="canonical"'))
})

test('sitemap lists exactly the pages; robots points at it', () => {
  const locs = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  assert.deepEqual(locs, pages().map((p) => canonical(p.path)))
  assert.match(read('robots.txt'), /^Sitemap: https:\/\/www\.valentinusjavier\.com\/sitemap\.xml$/m)
})

test('assets referenced by prerendered HTML exist', () => {
  for (const p of [...pages().map((x) => fileFor(x.path)), '404.html']) {
    for (const [, u] of read(p).matchAll(/(?:src|href)="(\/[^"#?]+\.[a-z0-9]+)"/g)) {
      assert.ok(existsSync(new URL(u.slice(1), dist)), `${p} -> ${u}`)
    }
  }
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run build && node --test tests/seo.test.mjs`
Expected: FAIL on `every page ships its own head` (ENOENT `dist/project/toss.html`).

- [ ] **Step 3: Implement**

`src/entry-server.js`:
```js
/* Server entry for the prerender step (scripts/prerender.mjs). Plain
   createElement so this file carries no JSX and no component exports. */
import { StrictMode, createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { pages, canonical, notFoundMeta, SITE_URL, OG_IMAGE, PERSON_NAME } from './seo'

export const render = (url) =>
  renderToString(h(StrictMode, null, h(StaticRouter, { location: url }, h(App))))
```

`src/main.jsx`:
```jsx
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/* Prerendered pages ship their markup: hydrate it when it was rendered for
   this URL. 404.html is served for every unknown path and a trailing slash
   changes the path, so anywhere else start fresh rather than hydrate
   mismatched markup. */
if (root.dataset.route === location.pathname) hydrateRoot(root, app)
else createRoot(root).render(app)
```

`index.html`: replace the `<title>`, description and og/twitter block with `<!--app-head-->`; keep charset, viewport, font links.

`scripts/prerender.mjs`:
```js
/* Build step 3 of 3 (package.json "build"): one real HTML file per route, so
   crawlers that don't run JavaScript still get each page's content, title,
   description, canonical URL and structured data. Also writes 404.html,
   sitemap.xml and robots.txt from the same page list. */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const { render, pages, canonical, notFoundMeta, SITE_URL, OG_IMAGE, PERSON_NAME } =
  await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
for (const marker of ['<!--app-head-->', '<div id="root"></div>']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`)
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function head({ path, title, description, jsonLd, noindex }) {
  const url = path && canonical(path)
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex && '<meta name="robots" content="noindex" />',
    url && `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(PERSON_NAME)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="627" />',
    '<meta property="og:image:alt" content="The portfolio homepage: the Valentinus wordmark above the line Bridging product thinking, technical delivery, and user experience." />',
    '<meta name="twitter:card" content="summary_large_image" />',
    jsonLd && `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ')
}

function write(file, meta, route) {
  const html = template
    .replace('<!--app-head-->', head(meta))
    .replace('<div id="root"></div>', `<div id="root" data-route="${route}">${render(route)}</div>`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

const all = pages()
for (const p of all) write(join(dist, p.path === '/' ? 'index.html' : `${p.path.slice(1)}.html`), p, p.path)
write(join(dist, '404.html'), { ...notFoundMeta(), noindex: true }, '/404')

writeFileSync(join(dist, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...all.map((p) => `  <url><loc>${canonical(p.path)}</loc></url>`),
  '</urlset>', '',
].join('\n'))
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${all.length} pages, 404.html, sitemap.xml, robots.txt`)
```

`package.json`: `"build": "vite build && vite build --ssr src/entry-server.js --outDir dist-ssr && node scripts/prerender.mjs"`.

- [ ] **Step 4: Run to verify it passes**

Run: `npm test && npm run lint`
Expected: all tests pass; lint clean.
Browser (headless, `npx serve dist`): every route hydrates with no console errors; a Selected Work card click changes the tab title to the project's title; back restores the home title; `/project/nope` shows "Project not found." with HTTP 404.

- [ ] **Step 5: Commit** `feat(seo): prerender every route with its own head, sitemap and robots`

---

### Task 3: Hosting: real 404s, clean URLs, CV noindex

**Files:** Modify `vercel.json`; append test to `tests/seo.test.mjs`.

- [ ] **Step 1: Failing test**
```js
test('host config: clean URLs, real 404s, CV kept out of the index', () => {
  const v = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(v.rewrites, undefined, 'catch-all rewrite turns every typo into a 200')
  assert.equal(v.cleanUrls, true)
  assert.equal(v.trailingSlash, false)
  assert.equal(v.buildCommand, 'npm run build')
  const pdf = v.headers.find((h) => h.source === '/(.*)\\.pdf')
  assert.deepEqual(pdf.headers, [{ key: 'X-Robots-Tag', value: 'noindex' }])
})
```
- [ ] **Step 2:** `node --test tests/seo.test.mjs` → FAIL (`rewrites` defined).
- [ ] **Step 3:** `vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    { "source": "/(.*)\\.pdf", "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }] }
  ]
}
```
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `fix(hosting): real 404s, clean URLs, keep the CV out of search`

---

### Task 4: First-screen speed

**Files:** Modify `index.html`, `src/index.css`, `vercel.json`; create `public/fonts/*.woff2`.

Baseline (before this task, same machine): Lighthouse mobile on `npx serve dist` for `/` and `/project/toss`, record LCP/FCP/performance.

- [ ] **Step 1: First-screen reveal without waiting for the app.** `index.html`, directly after `<div id="root"></div>`:
```html
<script>
  /* Reveal what the first screen shows before the app loads, so the largest
     text paints without waiting on JavaScript; @starting-style in index.css
     keeps the fade. */
  for (const el of document.querySelectorAll('.rv')) if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in')
</script>
```
and in `<head>`: `<noscript><style>.rv { opacity: 1; transform: none; filter: none; }</style></noscript>`.
`src/index.css` after `.rv.in`: `@starting-style { .rv.in { opacity: 0; transform: translateY(26px); filter: blur(10px); } }`.
- [ ] **Step 2: Self-host the fonts that render today.** Download woff2 for Clash Display 500/600 (Fontshare), Instrument Serif 400 normal + italic and JetBrains Mono 400/500/600 (Google, latin + latin-ext subsets) into `public/fonts/`; declare `@font-face` (font-display: swap, same unicode-ranges) at the top of `src/index.css`; remove the four font `<link>`s; preload `clash-display-600.woff2` and `instrument-serif-400-latin.woff2`; add `{ "source": "/fonts/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }` to `vercel.json`. Satoshi stays undeclared, as on the live site.
- [ ] **Step 3: Verify.** Lighthouse mobile again: LCP lower than baseline on both pages, CLS not worse. Headless font check: the same loaded families as the live site. axe color-contrast still 0. Visual: hero fades in as before.
- [ ] **Step 4: Commit** `perf: paint the first screen without waiting on JavaScript, self-host fonts`

---

### After merge (VJ, with guidance)

1. Google Search Console: add property, verify (DNS TXT, or give me the HTML-file token), submit `https://www.valentinusjavier.com/sitemap.xml`, request indexing for `/`.
2. Bing Webmaster Tools: import from Search Console.
3. `curl -sI https://www.valentinusjavier.com/assets/<cv file>.pdf | grep -i x-robots-tag` shows `noindex`.
4. Links in: LinkedIn Website field and Featured; GitHub profile website and profile README; `toss-recipe-app` README; the site URL in the new CV header.
