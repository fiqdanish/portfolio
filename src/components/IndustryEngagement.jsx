import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, ExternalLink, ChevronDown } from 'lucide-react'
import { industryEngagements } from '../data/industry'
import SectionHeader from './SectionHeader'
import TerminalWindow from './TerminalWindow'
import Tag from './Tag'

const TAG_COLORS = ['teal', 'violet', 'green', 'blue', 'rust']

function EngagementRow({ item, last }) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(item.reflection).some((v) => v.trim() !== '')

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className={last ? '' : 'border-b border-term-line'}
    >
      <div className="p-5">
        <div className="mb-1.5 flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-mono text-base font-bold text-fg">{item.title}</h3>
          <span className="font-mono text-xs text-muted">{item.date}</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] text-muted">
          <span className="text-rust">{item.type}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
          {item.speakers.length > 0 && (
            <span className="inline-flex items-center gap-1"><Users size={11} /> {item.speakers.join(', ')}</span>
          )}
        </div>

        {item.topics.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {item.topics.map((t, i) => (
              <Tag key={t} color="rust">{t}</Tag>
            ))}
          </div>
        )}

        <p className="mb-3 text-sm leading-relaxed text-fg/80">{item.summary}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {item.links.linkedinPost && (
              <a href={item.links.linkedinPost} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-rust hover:text-rust-bright transition-colors">
                <ExternalLink size={13} /> linkedin
              </a>
            )}
            {item.links.hostSite && (
              <a href={item.links.hostSite} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-rust hover:text-rust-bright transition-colors">
                <ExternalLink size={13} /> host
              </a>
            )}
          </div>

          {!item.isPlaceholder && (
            <button onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-muted hover:text-fg transition-colors"
              aria-expanded={open}>
              <span className="text-rust">&gt;</span> {open ? 'close' : 'cat'} reflection
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={13} />
              </motion.span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-term-line"
          >
            <div className="bg-term-bg/50 p-5">
              {hasReflection ? (
                <div className="space-y-3 text-sm leading-relaxed text-fg/85">
                  {item.reflection.takeaway && (
                    <p><strong className="text-rust">key takeaway.</strong> {item.reflection.takeaway}</p>
                  )}
                  {item.reflection.surprise && (
                    <p><strong className="text-rust">what surprised me.</strong> {item.reflection.surprise}</p>
                  )}
                  {item.reflection.application && (
                    <p><strong className="text-rust">how I&apos;d apply this.</strong> {item.reflection.application}</p>
                  )}
                  {item.reflection.questions && (
                    <p><strong className="text-rust">questions it raised.</strong> {item.reflection.questions}</p>
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
}

export default function IndustryEngagement() {
  return (
    <section id="industry" className="container-page border-t border-term-line py-20">
      <SectionHeader
        index="[04]"
        log="streaming_logs..."
        title="~/logs"
        comment="talks & visits where I stepped outside coursework — and what carried over."
        command="cat engagements.json | jq '.[]'"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <TerminalWindow title="~/logs — tail -f engagements.json" bodyClassName="p-0">
          <p className="border-b border-term-line px-5 py-3 font-mono text-xs text-muted">
            <span className="text-rust">&gt;</span> Streaming latest talks &amp; visits…
            <span className="caret" />
          </p>
          {industryEngagements.map((item, i) => (
            <EngagementRow
              key={item.id}
              item={item}
              last={i === industryEngagements.length - 1}
            />
          ))}
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
