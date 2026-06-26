import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'
import TerminalWindow from './TerminalWindow'
import Tag from './Tag'

function AnimatedNumber({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) =>
    Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(2),
  )
  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration: 1.6, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, value, motionValue])
  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </span>
  )
}

// Placeholder ASCII portrait — replaced with a real conversion once a photo is provided.
const ASCII_PORTRAIT = `        ░▒▒▓▓▓▒▒░
     ░▒▓██████████▓▒░
    ▒▓███▀▀    ▀▀███▓▒
   ▒▓██▀          ▀██▓▒
   ▓██    ●    ●    ██▓
   ▓██      ╷╷      ██▓
   ▒▓██    ╰──╯    ██▓▒
    ▒▓███▄      ▄███▓▒
     ░▒▓██████████▓▒░
    ░▒▓▓▒░  ████  ░▒▓▓▒░
  ▒▓████████████████████▓▒
 ▓████████████████████████▓`

const EXPERTISE = [
  { label: 'Data Engineering', color: 'rust' },
  { label: 'Cloud Pipelines', color: 'teal' },
  { label: 'Apache Spark', color: 'violet' },
  { label: 'Dimensional Modeling', color: 'blue' },
  { label: 'Power BI', color: 'green' },
  { label: 'Python · SQL', color: 'rust' },
]

export default function Hero() {
  // Press ENTER from the landing to "explore" — scrolls into the work.
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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TerminalWindow title="~/portfolio — zsh">
          {/* boot line */}
          <p className="font-mono text-sm text-fg/90 mb-8">
            <span className="text-rust">&gt;</span> Extracting<span className="text-muted">....</span>{' '}
            Transforming<span className="text-muted">.....</span> Loading
            <span className="text-muted">......</span>
            <span className="caret" />
          </p>

          {/* portrait + name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-8">
            <pre
              aria-hidden="true"
              className="hidden sm:block font-mono text-[7px] leading-[7px] text-rust/70 select-none"
            >
              {ASCII_PORTRAIT}
            </pre>
            <div>
              <h1 className="font-pixel text-rust leading-[1.15] text-3xl sm:text-5xl">
                AFIQ
                <br />
                DANISH
              </h1>
              <p className="font-mono text-sm text-muted mt-4">
                The <span className="text-fg">&quot;Data Engineer&quot;</span>
              </p>
            </div>
          </div>

          {/* expertise */}
          <p className="comment text-sm mb-3">// Expertise</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {EXPERTISE.map((e) => (
              <Tag key={e.label} color="rust">
                {e.label}
              </Tag>
            ))}
          </div>

          <p className="comment text-sm italic mb-8">
            // Building reliable systems that turn messy data into something you can trust.
          </p>

          {/* command + metrics */}
          <p className="font-mono text-sm text-fg/90 mb-2">
            <span className="text-rust">&gt;</span> python3 -m afiq_danish --verbose
          </p>
          <p className="font-mono text-xs text-muted mb-8">
            // metrics: cgpa=<span className="text-tag-green">
              <AnimatedNumber value={3.94} />
            </span>{' '}
            projects=<span className="text-tag-green">
              <AnimatedNumber value={projects.length} />
            </span>{' '}
            certifications=<span className="text-tag-green">
              <AnimatedNumber value={certifications.length} />
            </span>
          </p>

          {/* success box */}
          <button
            type="button"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="block w-full text-left rounded border border-success/40 bg-success/[0.06]
                       px-4 py-3 font-mono text-sm text-success transition-colors hover:bg-success/[0.12]"
          >
            [SUCCESS] Press return/ENTER to explore my work.
          </button>

          {/* links */}
          <div className="mt-6 flex flex-wrap gap-5 font-mono text-sm">
            <a
              href="https://github.com/fiqdanish"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-rust transition-colors"
            >
              <Github size={14} /> github
            </a>
            <a
              href="https://linkedin.com/in/afiqdanish279"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-rust transition-colors"
            >
              <Linkedin size={14} /> linkedin
            </a>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
