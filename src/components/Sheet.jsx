import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { spring, springSheet } from '../lib/motion'

/**
 * iOS-style bottom sheet. Drag it down to dismiss.
 *
 * Skill sections applied:
 *  §2  1:1 finger tracking (Framer drag tracks the pointer, respects grab offset)
 *  §5  velocity handoff  — dragSnapToOrigin springs back carrying release velocity
 *  §6  momentum projection — dismiss decided by release velocity, not just position
 *  §7  symmetric path — enters from the bottom, dismisses to the bottom
 *  §9  rubber-banding — dragElastic resists past the open (top) boundary
 *  §12 dim-to-focus scrim + heavier glass material for a modal task
 *  §13 haptic on the causal commit (dismiss), only at a meaningful moment
 *
 * Note: enter/exit (outer) and drag (inner) live on separate elements so they
 * don't fight over the same `y` transform.
 */
export default function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* §12 dim-to-focus scrim */}
          <motion.div
            className="absolute inset-0 bg-black/55"
            style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
            onClick={onClose}
          />

          {/* outer: owns enter/exit y */}
          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={springSheet}
          >
            {/* inner: owns drag y (separate element, no transform clash) */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.14}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                // §6 project the throw: fast flick or far pull commits the dismiss
                if (info.offset.y > 120 || info.velocity.y > 600) {
                  navigator.vibrate?.(8) // §13
                  onClose()
                }
              }}
              className="glass-strong flex max-h-[85vh] flex-col rounded-t-3xl"
            >
              {/* drag handle */}
              <div className="flex cursor-grab justify-center pb-1 pt-3 active:cursor-grabbing">
                <span className="h-1.5 w-10 rounded-full bg-white/25" />
              </div>

              <div className="flex items-center justify-between px-6 pb-3 pt-1">
                <p className="font-mono text-sm text-rust">{title}</p>
                <motion.button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  whileTap={{ scale: 0.9 }}
                  transition={spring}
                  className="rounded-full border border-white/10 bg-white/[0.05] p-1.5 text-muted hover:text-fg"
                >
                  <X size={15} />
                </motion.button>
              </div>

              <div className="overflow-y-auto px-6 pb-8" style={{ overscrollBehavior: 'contain' }}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
