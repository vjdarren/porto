import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* House rules for the site copy that are cheap to break and easy to miss. */
const root = fileURLToPath(new URL('..', import.meta.url))
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f)
  return statSync(p).isDirectory() ? walk(p) : /\.(js|jsx|css|html)$/.test(p) ? [p] : []
})
const files = [...walk(join(root, 'src')), join(root, 'index.html')]
const hits = (re) => files.flatMap((f) => readFileSync(f, 'utf8').split('\n')
  .flatMap((l, i) => (re.test(l) ? [`${f.slice(root.length)}:${i + 1}`] : [])))

test('no em dashes in site source', () => assert.deepEqual(hits(/—/), []))
test('no placeholder links', () => assert.deepEqual(hits(/href: '#'/), []))
