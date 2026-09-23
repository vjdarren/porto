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
