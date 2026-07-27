/**
 * Apple-style spring presets for Framer Motion.
 *
 * Framer's `bounce` + `duration` spring maps to Apple's damping + response
 * (skill §4): bounce 0 = critically damped (damping 1.0, no overshoot);
 * duration ≈ response (settle time emerges from the spring, it is not a fixed
 * duration). Reserve bounce for momentum-driven interactions (§4).
 */

// Default UI motion — critically damped, graceful, non-distracting.
export const spring = { type: 'spring', bounce: 0, duration: 0.4 }

// Gentle scroll-reveal.
export const springSoft = { type: 'spring', bounce: 0, duration: 0.55 }

// Snappy press/tap feedback (§1 respond instantly on pointer-down).
export const springFast = { type: 'spring', bounce: 0, duration: 0.18 }

// Momentum interactions only — a flick, a throw, a drag release (§4).
export const springMomentum = { type: 'spring', bounce: 0.22, duration: 0.45 }

// Sheets / drawers — slight overshoot on the momentum settle (§4 table).
export const springSheet = { type: 'spring', bounce: 0.18, duration: 0.4 }

// Shared interaction feedback (§1). Pointer-down scale, spring back on release.
export const press = {
  whileTap: { scale: 0.97 },
  whileHover: { scale: 1.02 },
  transition: springFast,
}

// Standard scroll-in reveal (§4/§7 — symmetric, spring, interruptible).
export const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: springSoft,
}
