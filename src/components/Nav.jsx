import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_LINKS } from '../navLinks'

/* `to` routes through react-router, `href` is a plain anchor. */
function NavLink({ link, onClick }) {
  const extra = link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return link.to ? (
    <Link to={link.to} data-cur="link" onClick={onClick}>{link.label}</Link>
  ) : (
    <a href={link.href} data-cur="link" onClick={onClick} {...extra}>{link.label}</a>
  )
}

export default function Nav({ links = HOME_LINKS, brand = '#top' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* The bar is fixed, so everything that has to clear it (anchor jumps, the
     case-study title, the mobile sheet) reads its real height off --navh. */
  useEffect(() => {
    const nav = document.querySelector('.nav')
    if (!nav) return
    const measure = () =>
      document.documentElement.style.setProperty('--navh', `${Math.round(nav.offsetHeight)}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(nav)
    return () => {
      ro.disconnect()
      document.documentElement.style.removeProperty('--navh')
    }
  }, [])

  /* Past the first few pixels the bar needs a solid ground: a gradient alone
     lets body copy read straight through the wordmark. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the overlay, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    /* Widening past the mobile breakpoint hides the toggle : don't strand the
       sheet open with no way to close it. */
    const onResize = () => { if (window.innerWidth > 820) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const brandProps = brand.startsWith('#')
    ? { href: brand }
    : null

  return (
    <nav className={`nav${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      {brandProps ? (
        <a className="mark" {...brandProps} data-cur="link" onClick={close}>
          Valentinus<span className="pt">.</span>
        </a>
      ) : (
        <Link className="mark" to={brand} data-cur="link" onClick={close}>
          Valentinus<span className="pt">.</span>
        </Link>
      )}

      <div className="right">
        {links.map((l) => (
          <NavLink key={l.label} link={l} />
        ))}
      </div>

      <button
        type="button"
        className="navtoggle"
        aria-expanded={open}
        aria-controls="nav-overlay"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        data-cur="link"
      >
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className="navsheet" id="nav-overlay" hidden={!open}>
        {links.map((l) => (
          <NavLink key={l.label} link={l} onClick={close} />
        ))}
      </div>
    </nav>
  )
}
