/**
 * Calm, static ambient backdrop — soft warm/cool glows on the deep base.
 *
 * Skill §14: deliberately NOT animated (no full-viewport moving background,
 * no slow looping oscillation). Motion lives in the UI, not the wallpaper.
 * Pure CSS gradients → zero runtime cost and reduced-motion-safe by nature.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 bg-term-bg">
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(58% 48% at 16% 8%, rgba(224,120,86,0.16), transparent 62%)',
            'radial-gradient(52% 44% at 86% 92%, rgba(96,120,255,0.10), transparent 60%)',
            'radial-gradient(46% 40% at 92% 12%, rgba(167,139,250,0.09), transparent 60%)',
          ].join(','),
        }}
      />
      {/* subtle darkening toward the edges keeps focus centered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.45))',
        }}
      />
    </div>
  )
}
