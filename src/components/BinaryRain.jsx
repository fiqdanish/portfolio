import { useEffect, useRef } from 'react'

/**
 * Falling binary (0/1) rain on a fixed full-viewport 2D canvas, behind all
 * content. Dim rust glyphs, gentle speed — a backdrop, not a focal point.
 *
 * - Sized via ResizeObserver off the canvas's own box (robust against the
 *   window.innerWidth quirk seen in embedded contexts).
 * - Throttled to ~22fps so it stays subtle and cheap.
 * - prefers-reduced-motion: paints a single static dim field, no loop.
 */
export default function BinaryRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const FONT = 14
    let width = 0
    let height = 0
    let columns = 0
    let drops = []

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      if (w < 4 || h < 4) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = w
      height = h
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT}px "JetBrains Mono", monospace`
      columns = Math.ceil(w / FONT)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * h) / FONT),
      )
      if (reduce) paintStatic()
    }

    const paintStatic = () => {
      ctx.fillStyle = '#0c0a0a'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(224, 120, 86, 0.10)'
      for (let i = 0; i < columns; i++) {
        for (let y = FONT; y < height; y += FONT) {
          if (Math.random() < 0.4) {
            ctx.fillText(Math.random() < 0.5 ? '0' : '1', i * FONT, y)
          }
        }
      }
    }

    const drawFrame = () => {
      // translucent wash leaves fading trails
      ctx.fillStyle = 'rgba(12, 10, 10, 0.12)'
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < columns; i++) {
        const x = i * FONT
        const y = drops[i] * FONT
        ctx.fillStyle =
          Math.random() < 0.012
            ? 'rgba(255, 155, 120, 0.55)' // occasional bright head
            : 'rgba(224, 120, 86, 0.16)'
        ctx.fillText(Math.random() < 0.5 ? '0' : '1', x, y)
        if (y > height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf
    let last = 0
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (t - last < 45) return // ~22fps
      last = t
      drawFrame()
    }
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full bg-term-bg"
    />
  )
}
