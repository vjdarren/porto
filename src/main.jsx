import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

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
