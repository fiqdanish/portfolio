import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Github, Linkedin, ArrowDown } from 'lucide-react'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'
import TerminalWindow from './TerminalWindow'
import Tag from './Tag'
import asciiPortrait from '../assets/portrait.txt?raw'
import { spring, springSoft, springFast } from '../lib/motion'

function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) =>
    Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(2),
  )
  useEffect(() => {
    if (inView) {
      // §4 spring, critically damped — settles cleanly on the exact value
      const controls = animate(motionValue, value, { type: 'spring', bounce: 0, duration: 1.1 })
      return controls.stop
    }
  }, [inView, value, motionValue])
  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </span>
  )
}

const EXPERTISE = [
  'Data Engineering',
  'Cloud Pipelines',
  'Apache Spark',
  'Dimensional Modeling',
  'Power BI',
  'Python · SQL',
]

// staggered reveal children (§4/§7)
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: springSoft },
}

export default function Hero() {
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === 'Enter' &&
        window.scrollY < 200 &&
        !['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(e.target.tagName)
      ) {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="container-page pt-10 pb-16 sm:pt-14">
      {/* §12 materialize — the glass panel blurs into place rather than plain-fading */}
      <motion.div
        initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={springSoft}
      >
        <TerminalWindow title="~/portfolio — zsh">
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate="show"
          >
            {/* status line */}
            <motion.p variants={item} className="mb-8 font-mono text-sm text-fg/80">
              <span className="text-rust">&gt;</span> Extracting
              <span className="text-muted">....</span> Transforming
              <span className="text-muted">.....</span> Loading
              <span className="text-muted">......</span>
              <span className="caret" />
            </motion.p>

            {/* portrait + name */}
            <motion.div
              variants={item}
              className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10"
            >
              <pre
                aria-hidden="true"
                className="hidden select-none font-mono text-[8px] leading-[8px] text-rust/80 sm:block"
              >
                {asciiPortrait}
              </pre>
              <div>
                <h1 className="text-display">Afiq Danish</h1>
                <p className="mt-3 text-base text-muted">
                  Data engineer <span className="text-fg/40">·</span> pipeline thinker{' '}
                  <span className="text-fg/40">·</span> problem solver
                </p>
              </div>
            </motion.div>

            {/* expertise */}
            <motion.div variants={item}>
              <p className="comment mb-3 text-sm">// expertise</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {EXPERTISE.map((label) => (
                  <Tag key={label} color="rust">
                    {label}
                  </Tag>
                ))}
              </div>
            </motion.div>

            <motion.p variants={item} className="comment mb-8 max-w-xl text-sm text-body">
              // Building reliable systems that turn messy data into something you can trust.
            </motion.p>

            {/* command + metrics */}
            <motion.p variants={item} className="mb-2 font-mono text-sm text-fg/80">
              <span className="text-rust">&gt;</span> python3 -m afiq_danish --verbose
            </motion.p>
            <motion.p variants={item} className="mb-8 font-mono text-xs text-muted">
              // metrics: cgpa=<span className="text-tag-green"><AnimatedNumber value={3.94} /></span>{' '}
              projects=<span className="text-tag-green"><AnimatedNumber value={projects.length} /></span>{' '}
              certifications=<span className="text-tag-green"><AnimatedNumber value={certifications.length} /></span>
            </motion.p>

            {/* CTA — pointer-down feedback (§1), spring (§4) */}
            <motion.div variants={item}>
              <motion.button
                type="button"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={springFast}
                className="flex w-full items-center justify-between rounded-2xl border border-success/30 bg-success/[0.08] px-5 py-3.5 text-left font-mono text-sm text-success"
              >
                <span>[SUCCESS] Press return / ENTER to explore my work.</span>
                <ArrowDown size={16} className="shrink-0" />
              </motion.button>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
                <motion.a
                  href="https://github.com/fiqdanish"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springFast}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-muted hover:text-fg"
                >
                  <Github size={14} /> github
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/afiqdanish279"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springFast}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-muted hover:text-fg"
                >
                  <Linkedin size={14} /> linkedin
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
