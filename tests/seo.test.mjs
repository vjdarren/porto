import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { pages, HOME_META, projectMeta, trimDescription, canonical } from '../src/seo.js'
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

/* ---- Prerendered output (npm test builds first) ---- */
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

test('host config: clean URLs, real 404s, CV kept out of the index', () => {
  const v = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(v.rewrites, undefined, 'catch-all rewrite turns every typo into a 200')
  assert.equal(v.cleanUrls, true)
  assert.equal(v.trailingSlash, false)
  assert.equal(v.buildCommand, 'npm run build')
  const pdf = v.headers.find((h) => h.source === '/(.*)\\.pdf')
  assert.deepEqual(pdf.headers, [{ key: 'X-Robots-Tag', value: 'noindex' }])
})

test('every page links the icons, and favicon.ico carries 16, 32 and 48px', () => {
  for (const p of [...pages().map((x) => fileFor(x.path)), '404.html']) {
    const html = read(p)
    assert.ok(html.includes('<link rel="icon" href="/favicon.ico" sizes="48x48" />'), `${p} favicon`)
    assert.ok(html.includes('<link rel="apple-touch-icon" href="/apple-touch-icon.png" />'), `${p} apple-touch-icon`)
  }
  const ico = readFileSync(new URL('favicon.ico', dist))
  assert.equal(ico.readUInt16LE(2), 1, 'ICO type')
  const sizes = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico[6 + i * 16] || 256)
  assert.deepEqual(sizes, [16, 32, 48])
})
