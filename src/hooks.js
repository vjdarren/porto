import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (ents) => {
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
    // Failsafe: reveal everything after 700ms if IO never fires (e.g. hidden tab)
    const t = setTimeout(() => els.forEach((e) => e.classList.add('in')), 700)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
}
