import { useEffect, useState, useCallback, useRef } from 'react'

/* Shared visuals grid + lightbox.
   Screenshots of reports, SPSS output and requirement tables are unreadable at
   grid size, so every filled slot opens full-resolution on click. */
export default function Visuals({ items }) {
  const [open, setOpen] = useState(null)

  const shown = items.filter((v) => v.src)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d) => setOpen((i) => (i + d + shown.length) % shown.length),
    [shown.length]
  )

  /* Paging was keyboard-only. On touch, swipe the figure. */
  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.changedTouches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1)
  }

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

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
          {shown.length > 1 && (
            <>
              <button
                className="lb-nav prev"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); step(-1) }}
              >←</button>
              <button
                className="lb-nav next"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); step(1) }}
              >→</button>
            </>
          )}
          <figure
            className="lb-figure"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
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
