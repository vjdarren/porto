import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf

    const move = (e) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', move)

    /* 0.2 lerp ≈ 75ms to mostly catch up, ~225ms to settle : the deliberate trail */
    const tick = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      /* skip the write once we're within a subpixel of the target */
      if (el && (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1)) {
        el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const over = (e) => {
      const explore = e.target.closest('[data-cur="explore"]')
      const link = e.target.closest('a, button, [data-cur="link"]')
      document.body.classList.toggle('cur-explore', !!explore)
      document.body.classList.toggle('cur-link', !!link && !explore)
    }
    document.addEventListener('mouseover', over)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div className="vcursor" ref={ref}>
      <span className="lab">Explore</span>
    </div>
  )
}
