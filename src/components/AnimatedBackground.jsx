import { useEffect, useRef } from 'react'

/**
 * Full-viewport WebGL backdrop: a slow flowing noise field (domain-warped fbm)
 * with a glow that follows the cursor. The .glass cards refract this through an
 * SVG displacement filter, so moving the cursor makes the light bend and bloom
 * behind the glass.
 *
 * Performance: rendered at a fraction of viewport resolution (it's a soft
 * backdrop, upscaled by CSS) and the rAF loop only runs when motion is allowed.
 * Respects prefers-reduced-motion: renders a single static frame, no loop,
 * no cursor tracking.
 */
const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // Flowing domain-warped noise (time pushed into the offsets => it moves).
  float t = uTime * 0.12;
  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(t, 1.0)));
  vec2 r = vec2(
    fbm(p * 1.3 + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p * 1.3 + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t)
  );
  float f = fbm(p * 1.3 + 1.8 * r);

  // Vivid jewel-tone palette so there is real contrast to refract.
  vec3 deepBlue = vec3(0.04, 0.10, 0.28);
  vec3 violet   = vec3(0.22, 0.10, 0.45);
  vec3 teal     = vec3(0.02, 0.30, 0.42);
  vec3 magenta  = vec3(0.42, 0.16, 0.46);

  vec3 col = deepBlue;
  col = mix(col, violet,  clamp(r.x * 1.4, 0.0, 1.0));
  col = mix(col, teal,    clamp(r.y * 1.2, 0.0, 1.0));
  col = mix(col, magenta, clamp(f * f * 1.4, 0.0, 1.0));

  // Soft, subtle glow that tracks the cursor (the custom cursor is the star).
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float d = length(p - m);
  col += vec3(0.14, 0.20, 0.40) * (0.045 / (d * d + 0.16));

  col *= 1.0 - 0.28 * length(uv - 0.5);   // gentle vignette
  gl_FragColor = vec4(col, 1.0);
}
`

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl =
      canvas.getContext('webgl', { antialias: false, alpha: false }) ||
      canvas.getContext('experimental-webgl')
    if (!gl) return // no WebGL: bg-ink underneath stays as the fallback

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('shader:', gl.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aLoc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(aLoc)
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const RENDER_SCALE = 0.6 // soft backdrop — render small, CSS upscales

    // Size off the canvas's own layout box (more robust than window.innerWidth,
    // which can misreport in embedded/iframe contexts).
    const viewport = () => [
      canvas.clientWidth || window.innerWidth || 1,
      canvas.clientHeight || window.innerHeight || 1,
    ]
    const resize = () => {
      const [vw, vh] = viewport()
      if (vw < 4 || vh < 4) return // ignore spurious zero/tiny measurements
      const w = Math.max(1, Math.floor(vw * RENDER_SCALE))
      const h = Math.max(1, Math.floor(vh * RENDER_SCALE))
      if (canvas.width === w && canvas.height === h) return
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = [0.5, 0.5]
    const targetMouse = [0.5, 0.5]
    const onMove = (e) => {
      const [vw, vh] = viewport()
      targetMouse[0] = e.clientX / vw
      targetMouse[1] = 1 - e.clientY / vh
    }
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })

    let raf
    const startTime = performance.now()
    const draw = (now) => {
      const t = reduce ? 0 : (now - startTime) / 1000
      mouse[0] += (targetMouse[0] - mouse[0]) * 0.045
      mouse[1] += (targetMouse[1] - mouse[1]) * 0.045
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouse[0], mouse[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    if (reduce) {
      gl.uniform2f(uMouse, 0.5, 0.5)
      draw(startTime)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      // NB: don't call WEBGL_lose_context here — under StrictMode the
      // unmount/remount runs on the same canvas, and losing the context would
      // leave the remount with a dead context (shaders fail to compile).
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full bg-ink"
    />
  )
}
