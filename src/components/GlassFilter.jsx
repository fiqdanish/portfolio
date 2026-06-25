/**
 * SVG displacement filter referenced by the .glass utilities
 * (`backdrop-filter: url(#glass-refraction)`). feTurbulence generates a noise
 * field and feDisplacementMap bends the backdrop pixels by it — a genuine
 * refraction/warp of whatever is behind the glass, not just a blur.
 *
 * Rendered once, hidden. Chromium honours url() filters in backdrop-filter;
 * browsers that don't fall back to plain blur via the @supports rule in CSS.
 */
export default function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id="glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.018"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
