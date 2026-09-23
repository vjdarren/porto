import { Link } from 'react-router-dom'
import Cursor from '../components/Cursor'
import Nav from '../components/Nav'
import { PROJECT_LINKS } from '../navLinks'
import { useDocumentMeta } from '../hooks'

/* Reached two ways: an unknown /project/:slug, and the catch-all route. Without
   the catch-all a typo'd URL rendered nothing at all, because the host rewrites
   every path to index.html and React then matched no route. */
export default function NotFound({ what = 'Page' }) {
  useDocumentMeta(`${what} not found`)

  return (
    <>
      <Cursor />
      <Nav links={PROJECT_LINKS} brand="/" />
      <h1 className="not-found">
        {what} not found.{' '}
        <Link to="/" data-cur="link">← Back to all work</Link>
      </h1>
    </>
  )
}
