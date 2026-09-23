import { useEffect } from 'react'
import { HOME_META } from './seo'

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    /* The observer proves itself by reporting at all: its first callback fires
       on the next frame for whatever is already on screen. If that never lands
       the API is inert (hidden tab, older engine) and the failsafe below has to
       stand in : unconditionally revealing everything would otherwise defeat
       the scroll reveal for every element still below the fold. */
    let observerReported = false
    const io = new IntersectionObserver(
      (ents) => {
        observerReported = true
        ents.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((e) => io.observe(e))
    const t = setTimeout(() => {
      if (observerReported) return
      els.forEach((e) => e.classList.add('in'))
    }, 700)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
}

/* Title and description for client-side navigation. Crawlers get the same
   values from the prerendered HTML; both come from seo.js. */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    const tag = document.querySelector('meta[name="description"]')
    tag?.setAttribute('content', description)

    return () => {
      document.title = HOME_META.title
      tag?.setAttribute('content', HOME_META.description)
    }
  }, [title, description])
}
