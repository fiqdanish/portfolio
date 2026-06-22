import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * The signature visual: a thin vertical line on the left edge with a
 * flowing dot that maps to scroll progress. The dot shifts color as
 * you descend through bronze → silver → gold sections, referencing
 * medallion architecture without being literal about it.
 */
export default function PipelineThread() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return smooth.on('change', (v) => setProgress(v))
  }, [smooth])

  // Color transition: bronze → silver → gold
  const dotColor =
    progress < 0.33 ? '#B87333' : progress < 0.66 ? '#A8A9AD' : '#C9A24A'

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block fixed left-8 top-0 bottom-0 w-px pointer-events-none z-30"
      style={{ marginLeft: 'calc((100vw - min(72rem, 100vw)) / 2 - 1rem)' }}
    >
      {/* Static track */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-rule" />

      {/* Three medallion-stage anchors */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ top: '20%', background: '#B87333' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ top: '50%', background: '#A8A9AD' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ top: '80%', background: '#C9A24A' }}
      />

      {/* Moving dot bound to scroll */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{
          top: `${progress * 100}%`,
          background: dotColor,
          boxShadow: `0 0 12px ${dotColor}`,
          transition: 'background 400ms ease, box-shadow 400ms ease',
        }}
      />
    </div>
  )
}
