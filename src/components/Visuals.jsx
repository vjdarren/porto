import { useEffect, useState, useCallback } from 'react'

/* Shared visuals grid + lightbox.
   Screenshots of reports, SPSS output and requirement tables are unreadable at
   grid size, so every filled slot opens full-resolution on click. */
export default function Visuals({ items }) {
  const [open, setOpen] = useState(null)

  const shown = items.filter((v) => v.src)
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % shown.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + shown.length) % shown.length)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, shown.length, close])

  return (
    <>
      <div className="vis-grid rv d1">
        {items.map((v, i) => {
          const idx = shown.indexOf(v)
          return (
            <figure className="vis-item" key={i}>
              {v.src ? (
                <button
                  type="button"
                  className="img-slot has-img"
                  data-cur="link"
                  aria-label={`View ${v.label} full size`}
                  onClick={() => setOpen(idx)}
                >
                  <img src={v.src} alt={v.alt} loading="lazy" />
                  <span className="zoom-hint">Expand</span>
                </button>
              ) : (
                <div className="img-slot">
                  <span className="img-label">{v.label}</span>
                </div>
              )}
              {v.src && <figcaption className="img-label">{v.label}</figcaption>}
            </figure>
          )
        })}
      </div>

      {open !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">✕</button>
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={shown[open].src} alt={shown[open].alt} />
            <figcaption>
              <span className="lb-label">{shown[open].label}</span>
              <span className="lb-count">
                {open + 1} / {shown.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
