/* Server entry for the prerender step (scripts/prerender.mjs). Plain
   createElement so this file carries no JSX and no component exports. */
import { StrictMode, createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { pages, canonical, notFoundMeta, SITE_URL, OG_IMAGE, PERSON_NAME } from './seo'

export const render = (url) =>
  renderToString(h(StrictMode, null, h(StaticRouter, { location: url }, h(App))))
