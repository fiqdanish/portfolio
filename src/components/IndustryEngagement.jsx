import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, ExternalLink, ArrowRight } from 'lucide-react'
import { industryEngagements } from '../data/industry'
import SectionHeader from './SectionHeader'
import TerminalWindow from './TerminalWindow'
import Tag from './Tag'
import Sheet from './Sheet'
import { springSoft, springFast } from '../lib/motion'

function EngagementRow({ item, last }) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(item.reflection).some((v) => v.trim() !== '')

  const fields = [
    ['key takeaway', item.reflection.takeaway],
    ['what surprised me', item.reflection.surprise],
    ["how I'd apply this", item.reflection.application],
    ['questions it raised', item.reflection.questions],
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0, transition: springSoft }}
      viewport={{ once: true, margin: '-40px' }}
      className={last ? '' : 'border-b border-white/[0.06]'}
    >
      <div className="p-5">
        <div className="mb-1.5 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-semibold tracking-[-0.01em] text-fg">{item.title}</h3>
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
            {item.topics.map((t) => (
              <Tag key={t} color="rust">{t}</Tag>
            ))}
          </div>
        )}

        <p className="mb-3 text-sm leading-relaxed text-fg/80 text-body">{item.summary}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {item.links.linkedinPost && (
              <motion.a
                href={item.links.linkedinPost}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={springFast}
                className="inline-flex items-center gap-1.5 text-rust hover:text-rust-bright"
              >
                <ExternalLink size={13} /> linkedin
              </motion.a>
            )}
            {item.links.hostSite && (
              <motion.a
                href={item.links.hostSite}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={springFast}
                className="inline-flex items-center gap-1.5 text-rust hover:text-rust-bright"
              >
                <ExternalLink size={13} /> host
              </motion.a>
            )}
          </div>

          {!item.isPlaceholder && hasReflection && (
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={springFast}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-muted hover:text-fg"
            >
              <span className="text-rust">&gt;</span> cat reflection <ArrowRight size={12} />
            </motion.button>
          )}
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} title={`reflection — ${item.title}`}>
        <div className="space-y-4 text-sm leading-relaxed text-fg/85 text-body">
          {fields.map(([label, text]) =>
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
}

export default function IndustryEngagement() {
  return (
    <section id="industry" className="container-page py-20">
      <SectionHeader
        index="[04]"
        log="streaming_logs..."
        title="~/logs"
        comment="talks & visits where I stepped outside coursework — and what carried over."
        command="cat engagements.json | jq '.[]'"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: springSoft }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <TerminalWindow title="~/logs — tail -f engagements.json" bodyClassName="p-0">
          <p className="border-b border-white/[0.06] px-5 py-3 font-mono text-xs text-muted">
            <span className="text-rust">&gt;</span> Streaming latest talks &amp; visits…
            <span className="caret" />
          </p>
          {/* §9/§12 contained overscroll + scroll-edge fade */}
          <div
            className="edge-fade-y max-h-[32rem] overflow-y-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            {industryEngagements.map((item, i) => (
              <EngagementRow
                key={item.id}
                item={item}
                last={i === industryEngagements.length - 1}
              />
            ))}
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
