import { useState, useMemo, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { Github, ExternalLink, Star, ChevronDown, AppWindow, FileText, Globe, TerminalSquare } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Tag from './Tag'

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
  Delivered:     { color: 'tag-green',  label: 'delivered' },
  'In-progress': { color: 'tag-blue',   label: 'in-progress' },
  Draft:         { color: 'tag-muted',  label: 'draft' },
}

const TAG_COLORS = ['teal', 'violet', 'green', 'blue', 'rust']
const QUICK_FILTERS = ['All', 'Featured', 'Delivered', 'In-progress', 'Draft']

const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(project.reflection).some((v) => v.trim() !== '')
  const status = STATUS[project.status] || STATUS.Draft

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className={`panel ${project.featured ? 'border-rust/40 hover:border-rust' : 'panel-hover'}`}
    >
      <div className="p-5">
        {/* header */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <TerminalSquare size={14} className="text-rust" />
            <span className="font-mono text-xs text-muted">{project.course}</span>
          </div>
          <span className="flex items-center gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-rust">
                <Star size={11} fill="currentColor" /> featured
              </span>
            )}
            <span className={`font-mono text-[0.65rem] ${status.color === 'tag-muted' ? 'text-muted' : ''}`}>
              <span className="text-muted">[</span>
              <span className={
                status.color === 'tag-green' ? 'text-tag-green'
                : status.color === 'tag-rust' ? 'text-rust'
                : 'text-muted'
              }>
                {' '}{status.label}{' '}
              </span>
              <span className="text-muted">]</span>
            </span>
          </span>
        </div>

        <h3 className="mb-2 font-mono text-lg font-bold leading-tight text-fg">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-fg/80">{project.summary}</p>

        {/* stack as #hashtags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech, i) => (
            <Tag key={tech} color="rust" prefix="#">
              {tech.replace(/\s+/g, '')}
            </Tag>
          ))}
        </div>

        {/* metadata as key: value */}
        <dl className="mb-4 space-y-1 border-y border-term-line py-3 font-mono text-xs">
          {Object.entries(project.metadata).map(([key, val]) => (
            <div key={key} className="flex gap-2">
              <dt className="shrink-0 text-rust/80">{key.toLowerCase()}:</dt>
              <dd className="text-fg/85">{val}</dd>
            </div>
          ))}
        </dl>

        {/* links + reflection toggle */}
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
                <a
                  key={key}
                  href={value.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-rust transition-colors hover:text-rust-bright"
                >
                  <Icon size={13} /> {meta.label}
                </a>
              )
            })}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
            aria-expanded={open}
          >
            <span className="text-rust">&gt;</span> {open ? 'close' : 'cat'} reflection.md
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.span>
          </button>
        </div>
      </div>

      {/* reflection */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="reflection"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-term-line"
          >
            <div className="bg-term-bg/50 p-5">
              <p className="comment mb-4 text-xs">// reflection.md</p>
              {hasReflection ? (
                <div className="space-y-3 text-sm leading-relaxed text-fg/85">
                  {project.reflection.context && (
                    <p><strong className="text-rust">context.</strong> {project.reflection.context}</p>
                  )}
                  {project.reflection.approach && (
                    <p><strong className="text-rust">approach.</strong> {project.reflection.approach}</p>
                  )}
                  {project.reflection.outcomes && (
                    <p><strong className="text-rust">what worked / what didn&apos;t.</strong> {project.reflection.outcomes}</p>
                  )}
                  {project.reflection.learning && (
                    <p><strong className="text-rust">what I&apos;d do differently.</strong> {project.reflection.learning}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm italic text-muted">// reflection pending…</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section id="projects" className="container-page border-t border-term-line py-20">
      <SectionHeader
        index="[02]"
        log="mounting_workspaces..."
        title="workspaces"
        comment="the sandbox — coursework, industry collaborations & self-directed builds."
        command="ls ~/workspaces --reflections"
      />

      {/* filter bar */}
      <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
        {QUICK_FILTERS.map((f) => {
          const active = activeFilter === f
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded border px-3 py-1.5 transition-colors ${
                active
                  ? 'border-rust bg-rust/10 text-rust'
                  : 'border-term-line text-muted hover:border-rust/50 hover:text-fg'
              }`}
            >
              {f.toLowerCase()} <span className="opacity-60">({countFor(f)})</span>
            </button>
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
