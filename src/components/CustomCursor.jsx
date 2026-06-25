import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a dot that tracks the pointer exactly plus a ring that trails
 * behind with smooth easing. Uses mix-blend-mode: difference so it inverts
 * whatever is beneath it, and grows over interactive elements.
 *
 * - Only enabled on a fine pointer (mouse) — touch devices keep their native UI.
 * - Writes transforms straight to the DOM via refs (no React re-renders).
 * - prefers-reduced-motion: the ring follows instantly (no trailing lag).
 */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, .glass'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return // skip touch

    const dot = dotRef.current
    const ring = ringRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }
    const place = (el, x, y) =>
      (el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`)

    place(dot, mouse.x, mouse.y)
    place(ring, mouse.x, mouse.y)

    // Visibility is driven inline (robust against any cascade quirk). Hidden
    // until the first real pointer move so it never flashes at the center.
    let shown = false
    const show = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      place(dot, mouse.x, mouse.y)
      if (reduce) place(ring, mouse.x, mouse.y)
      if (!shown) {
        shown = true
        show()
      }
    }

    let raf
    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      place(ring, ringPos.x, ringPos.y)
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) {
        ring.classList.add('cursor-hover')
        dot.classList.add('cursor-hover')
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) {
        ring.classList.remove('cursor-hover')
        dot.classList.remove('cursor-hover')
      }
    }
    const onLeave = () => hide()
    const onEnter = () => {
      if (shown) show()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      root.classList.remove('has-custom-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  )
}
