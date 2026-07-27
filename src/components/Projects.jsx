import { useState, useMemo, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { Github, ExternalLink, Star, AppWindow, FileText, Globe, TerminalSquare, ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Tag from './Tag'
import Sheet from './Sheet'
import { spring, springSoft, springFast } from '../lib/motion'

const LINK_META = {
  repo:    { label: 'repo',    icon: Github },
  paper:   { label: 'paper',   icon: FileText },
  report:  { label: 'report',  icon: FileText },
  liveApp: { label: 'live',    icon: AppWindow },
  demo:    { label: 'demo',    icon: Globe },
  video:   { label: 'video',   icon: Globe },
  diagram: { label: 'diagram', icon: ExternalLink },
}

const STATUS = {
  Delivered:     'text-tag-green',
  'In-progress': 'text-rust',
  Draft:         'text-muted',
}

const STATUS_LABEL = {
  Delivered: 'delivered',
  'In-progress': 'in-progress',
  Draft: 'draft',
}

const QUICK_FILTERS = ['All', 'Featured', 'Delivered', 'In-progress', 'Draft']

const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(project.reflection).some((v) => v.trim() !== '')

  const reflectionFields = [
    ['context', project.reflection.context],
    ['approach', project.reflection.approach],
    ["what worked / what didn't", project.reflection.outcomes],
    ["what I'd do differently", project.reflection.learning],
  ]

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { ...springSoft, delay: (index % 6) * 0.04 } }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4, transition: springFast }}
      className={`panel p-5 ${project.featured ? 'border-rust/30' : 'panel-hover'}`}
    >
      {/* header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} className="text-rust" />
          <span className="font-mono text-xs text-muted">{project.course}</span>
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.65rem]">
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-rust">
              <Star size={11} fill="currentColor" /> featured
            </span>
          )}
          <span className="text-muted">
            [ <span className={STATUS[project.status] || 'text-muted'}>{STATUS_LABEL[project.status]}</span> ]
          </span>
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-tight tracking-[-0.01em] text-fg">
        {project.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-fg/75 text-body">{project.summary}</p>

      {/* stack */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Tag key={tech} color="rust" prefix="#">
            {tech.replace(/\s+/g, '')}
          </Tag>
        ))}
      </div>

      {/* metadata */}
      <dl className="mb-4 space-y-1 border-t border-white/[0.06] pt-3 font-mono text-xs">
        {Object.entries(project.metadata).map(([key, val]) => (
          <div key={key} className="flex gap-2">
            <dt className="shrink-0 text-rust/80">{key.toLowerCase()}:</dt>
            <dd className="text-fg/80">{val}</dd>
          </div>
        ))}
      </dl>

      {/* links + reflection trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
          {Object.entries(project.links).map(([key, value]) => {
            if (key === 'platform') {
              return (
                <span key={key} className="inline-flex items-center gap-1.5 text-muted">
                  <AppWindow size={13} /> {value}
                </span>
              )
            }
            if (!value) return null
            const meta = LINK_META[key] || { label: key, icon: ExternalLink }
            const Icon = meta.icon
            return (
              <motion.a
                key={key}
                href={value.trim()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={springFast}
                className="inline-flex items-center gap-1.5 text-rust hover:text-rust-bright"
              >
                <Icon size={13} /> {meta.label}
              </motion.a>
            )
          })}
        </div>

        {hasReflection && (
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={springFast}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-muted hover:text-fg"
          >
            <span className="text-rust">&gt;</span> cat reflection.md
            <ArrowRight size={12} />
          </motion.button>
        )}
      </div>

      {/* reflection opens as a drag-to-dismiss sheet */}
      <Sheet open={open} onClose={() => setOpen(false)} title={`reflection.md — ${project.title}`}>
        <div className="space-y-4 text-sm leading-relaxed text-fg/85 text-body">
          {reflectionFields.map(([label, text]) =>
            text ? (
              <p key={label}>
                <strong className="text-rust">{label}.</strong> {text}
              </p>
            ) : null,
          )}
        </div>
      </Sheet>
    </motion.article>
  )
})

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const countFor = (f) =>
    f === 'All' ? projects.length
    : f === 'Featured' ? projects.filter((p) => p.featured).length
    : projects.filter((p) => p.status.toLowerCase() === f.toLowerCase()).length

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    if (activeFilter === 'Featured') return projects.filter((p) => p.featured)
    return projects.filter((p) => p.status.toLowerCase() === activeFilter.toLowerCase())
  }, [activeFilter])

  return (
    <section id="projects" className="container-page py-20">
      <SectionHeader
        index="[02]"
        log="mounting_workspaces..."
        title="workspaces"
        comment="the sandbox — coursework, industry collaborations & self-directed builds."
        command="ls ~/workspaces --reflections"
      />

      {/* filter bar — spring press + shared active pill (§1,§4,§7) */}
      <div className="mb-8 flex flex-wrap gap-1.5 font-mono text-xs">
        {QUICK_FILTERS.map((f) => {
          const active = activeFilter === f
          return (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileTap={{ scale: 0.94 }}
              transition={springFast}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${
                active ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-active"
                  transition={spring}
                  className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                />
              )}
              <span className="relative">
                {f.toLowerCase()} <span className="opacity-60">({countFor(f)})</span>
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* grid */}
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center font-mono text-sm italic text-muted">
          // no workspaces match this filter.
        </p>
      )}
    </section>
  )
}
