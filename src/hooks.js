import { useEffect } from 'react'

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

/* The shell is a single static index.html, so every route inherits the home
   page's <title> and description unless a page claims its own. Case studies are
   the links that actually get shared, so they are the ones that need it. */
const BASE_TITLE = 'Valentinus · Computing Graduate · Product & Technology'
const BASE_DESC =
  'Portfolio of Valentinus, computing graduate and software developer bridging system architecture, user experience, and strategic design.'

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Valentinus` : BASE_TITLE

    const tag = document.querySelector('meta[name="description"]')
    if (tag) {
      const d = description ? description.trim() : ''
      /* Search engines cut the snippet around 160 characters; trim on a word
         boundary so the tag never ends mid-word. */
      tag.setAttribute(
        'content',
        d.length > 160 ? `${d.slice(0, 157).replace(/\s+\S*$/, '')}…` : d || BASE_DESC
      )
    }

    return () => {
      document.title = BASE_TITLE
      if (tag) tag.setAttribute('content', BASE_DESC)
    }
  }, [title, description])
}
