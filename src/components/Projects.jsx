import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, allTechTags } from '../data/projects'
import { Github, ExternalLink, Star, ChevronDown, AppWindow, FileText, Globe } from 'lucide-react'

const LINK_META = {
  repo:     { label: 'Repository', icon: Github },
  paper:    { label: 'Paper',      icon: FileText },
  report:   { label: 'Report',     icon: FileText },
  liveApp:  { label: 'Live app',   icon: AppWindow },
  demo:     { label: 'Demo',       icon: Globe },
  video:    { label: 'Video',      icon: Globe },
}

const STATUS_STYLE = {
  Delivered:       'bg-gold/15      text-gold',
  'In-progress': 'bg-warn/15      text-warn',
  Draft:         'bg-silver/15    text-silver',
}

const QUICK_FILTERS = ['All', 'Featured', 'Delivered', 'In-progress', 'Draft']

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(project.reflection).some((v) => v.trim() !== '')

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className={`glass rounded border transition-all ${
        project.featured
          ? 'border-gold/30 hover:border-gold'
          : 'border-rule hover:border-paper/40'
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {project.featured && <Star size={14} className="text-gold" fill="currentColor" />}
            <p className="font-mono text-xs text-silver">{project.course}</p>
          </div>
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded ${STATUS_STYLE[project.status]}`}
          >
            [ {project.status} ]
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl mb-3 leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-paper/85 leading-relaxed mb-4">{project.summary}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        {/* Schema metadata */}
        <dl className="schema-grid mb-4">
          {Object.entries(project.metadata).map(([key, val]) => (
            <div key={key} className="schema-cell">
              <dt>{key}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>

        {/* Links + expand control */}
        <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 text-sm font-mono flex-wrap">
          {Object.entries(project.links).map(([key, value]) => {
            // 'platform' is a label, not a URL — render as plain text
            if (key === 'platform') {
              return (
                <span key={key} className="inline-flex items-center gap-1.5 text-silver">
                  <AppWindow size={14} /> {value}
                </span>
              )
            }
            // Skip empty URLs
            if (!value) return null

            const meta = LINK_META[key] || { label: key, icon: ExternalLink }
            const Icon = meta.icon
            return (
              <a
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-azure hover:text-gold transition-colors"
              >
                <Icon size={14} /> {meta.label}
              </a>
            )
          })}
        </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-silver hover:text-paper transition-colors"
            aria-expanded={open}
          >
            {open ? 'Hide' : 'Read'} reflection
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Expandable reflection */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="reflection"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-rule"
          >
            <div className="p-6 bg-ink/40">
              <p className="font-mono text-xs text-silver uppercase tracking-wider mb-4">
                Reflection
              </p>
              {hasReflection ? (
                <div className="space-y-3 text-sm leading-relaxed">
                  {project.reflection.context && (
                    <p>
                      <strong className="text-gold">Context.</strong>{' '}
                      {project.reflection.context}
                    </p>
                  )}
                  {project.reflection.approach && (
                    <p>
                      <strong className="text-gold">Approach.</strong>{' '}
                      {project.reflection.approach}
                    </p>
                  )}
                  {project.reflection.outcomes && (
                    <p>
                      <strong className="text-gold">What worked / what didn't.</strong>{' '}
                      {project.reflection.outcomes}
                    </p>
                  )}
                  {project.reflection.learning && (
                    <p>
                      <strong className="text-gold">What I'd do differently.</strong>{' '}
                      {project.reflection.learning}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-sm text-silver italic leading-relaxed">
                  <p>
                    <strong className="text-paper not-italic">Context.</strong>{' '}
                    [Why this project matters — the problem and why it's worth solving.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">Approach.</strong>{' '}
                    [What you built, key technical decisions, why this stack.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">What worked / what didn't.</strong>{' '}
                    [Be specific about real obstacles and how you got past them.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">What I'd do differently.</strong>{' '}
                    [Course outcome this maps to + what you'd improve and why.]
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    if (activeFilter === 'Featured') return projects.filter((p) => p.featured)
    return projects.filter(
      (p) => p.status.toLowerCase() === activeFilter.toLowerCase(),
    )
  }, [activeFilter])

  return (
    <section id="projects" className="py-20 border-t border-rule">
      <p className="section-label">[ 02 · projects ]</p>
      <h2 className="heading-display text-3xl sm:text-5xl mb-3">Projects</h2>
      <p className="text-silver text-lg max-w-2xl mb-8">
        Coursework, industry collaborations, and self-directed work across the
        Data Engineering programme. Click any card to read the reflection.
      </p>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {QUICK_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`chip ${activeFilter === f ? 'chip-active' : 'hover:border-paper hover:text-paper'}`}
          >
            {f}
            <span className="ml-1 opacity-60">
            ({f === 'All'
              ? projects.length
              : f === 'Featured'
              ? projects.filter((p) => p.featured).length
              : projects.filter((p) => p.status.toLowerCase() === f.toLowerCase()).length})
          </span>
          </button>
        ))}
      </div>

      {/* Card grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-silver italic text-center py-12">
          No projects match this filter yet.
        </p>
      )}
    </section>
  )
}
