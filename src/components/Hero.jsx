import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'

function AnimatedNumber({ value, suffix = '' }) {
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
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section className="pt-24 pb-10 sm:pt-32 sm:pb-12">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 font-mono text-sm text-silver mb-6"
      >
        <span className="w-2 h-2 bg-gold rounded-full animate-pulse-soft" />
        Data Engineering · UTM · Graduating 2027
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display font-normal tracking-tight text-4xl sm:text-6xl lg:text-7xl leading-[1.05] mb-8"
      >
        <span className="italic font-medium text-gold">Afiq Danish.</span>
        <br />
        Data engineer.{' '}
        <span className="text-silver">Pipeline thinker.</span>{' '}
        <span className="text-silver/60">Problem solver.</span>
      </motion.h1>

      {/* Lede */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg text-silver max-w-2xl mb-10"
      >
        Third-year Data Engineering student at Universiti Teknologi Malaysia,
        building real systems for real problems.
      </motion.p>

      {/* Animated stats row */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-rule mb-10"
      >
        <div>
          <dt className="font-mono text-xs text-silver uppercase tracking-wider mb-1">CGPA</dt>
          <dd className="font-display text-2xl text-paper">
            <AnimatedNumber value={3.94} /> <span className="text-silver text-base">/ 4.00</span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Projects</dt>
          <dd className="font-display text-2xl text-paper">
            <AnimatedNumber value={projects.length} />
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Certifications</dt>
          <dd className="font-display text-2xl text-paper">
            <AnimatedNumber value={certifications.length} />
          </dd>
        </div>
       
      </motion.dl>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded font-medium
                     hover:bg-gold transition-colors"
        >
          View projects <ArrowRight size={16} />
        </a>
        <a
          href="https://github.com/fiqdanish"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-rule px-5 py-3 rounded font-medium
                     hover:border-paper hover:bg-ink-2 transition-colors"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="https://linkedin.com/in/afiqdanish279"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-rule px-5 py-3 rounded font-medium
                     hover:border-paper hover:bg-ink-2 transition-colors"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
      </motion.div>
    </section>
  )
}
