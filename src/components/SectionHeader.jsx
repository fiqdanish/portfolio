import { motion } from 'framer-motion'

/**
 * Shared section header in the terminal idiom:
 *   [LOG]: <log>
 *   [NN]  Bold Title
 *   // <comment>
 *   > <command><caret>
 */
export default function SectionHeader({ index, log, title, comment, command }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      {log && (
        <p className="font-mono text-xs text-muted mb-3">
          [LOG]: {log} <span className="text-success">OK</span>
        </p>
      )}
      <h2 className="title-bold text-2xl sm:text-4xl leading-tight">
        {index && (
          <span className="font-mono text-base sm:text-lg text-rust mr-2 align-middle">
            {index}
          </span>
        )}
        {title}
      </h2>
      {comment && <p className="comment text-sm mt-3">// {comment}</p>}
      {command && (
        <p className="font-mono text-sm text-fg/80 mt-2">
          <span className="text-rust">&gt;</span> {command}
        </p>
      )}
    </motion.header>
  )
}
