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
  '</urlset>',
  '',
].join('\n'))
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${all.length} pages, 404.html, sitemap.xml, robots.txt`)
