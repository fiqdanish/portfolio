import { motion } from 'framer-motion'
import { springSoft } from '../lib/motion'

/**
 * Shared section header. §4 spring reveal; §15 the title uses the .title-bold
 * type scale (clamped size, negative tracking, tight leading).
 */
export default function SectionHeader({ index, log, title, comment, command }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={springSoft}
      className="mb-10"
    >
      {log && (
        <p className="mb-3 font-mono text-xs text-muted">
          [LOG]: {log} <span className="text-success">OK</span>
        </p>
      )}
      <h2 className="title-bold">
        {index && (
          <span className="mr-2 align-middle font-mono text-base text-rust sm:text-lg">
            {index}
          </span>
        )}
        {title}
      </h2>
      {comment && <p className="comment mt-3 text-sm">// {comment}</p>}
      {command && (
        <p className="mt-2 font-mono text-sm text-fg/80">
          <span className="text-rust">&gt;</span> {command}
        </p>
      )}
    </motion.header>
  )
}
