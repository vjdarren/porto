import { useEffect, useRef, useCallback } from 'react'

export default function Counter({ to, prefix = '', suffix = '', decimals = 0, className }) {
  const ref = useRef(null)
  const done = useRef(false)

  const run = useCallback(() => {
    if (done.current) return
    done.current = true
    const el = ref.current
    if (!el) return
    const dur = 1200, start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - t, 3)
      el.textContent = prefix + (to * e).toFixed(decimals) + suffix
      if (t < 1) requestAnimationFrame(tick)
      else el.textContent = prefix + to.toFixed(decimals) + suffix
    }
    requestAnimationFrame(tick)
  }, [to, prefix, suffix, decimals])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { run(); return }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(el) } }),
      { threshold: 0.5 }
    )
    io.observe(el)
    const ft = setTimeout(() => {
      if (!done.current) {
        done.current = true
        el.textContent = prefix + to.toFixed(decimals) + suffix
      }
    }, 900)
    return () => { io.disconnect(); clearTimeout(ft) }
  }, [run, to, prefix, suffix, decimals])

  return (
    <span className={className} ref={ref}>
      {prefix + (0).toFixed(decimals) + suffix}
    </span>
  )
}
