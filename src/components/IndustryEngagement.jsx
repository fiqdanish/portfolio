import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, ExternalLink, ChevronDown, Building2 } from 'lucide-react'
import { industryEngagements } from '../data/industry'

function EngagementCard({ item, index }) {
  const [open, setOpen] = useState(false)
  const hasReflection = Object.values(item.reflection).some((v) => v.trim() !== '')

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`bg-ink-2 rounded border ${
        item.isPlaceholder
          ? 'border-dashed border-silver/30 opacity-60'
          : 'border-rule hover:border-paper/40'
      } transition-colors`}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Building2 size={14} className="text-gold" />
          <p className="font-mono text-xs uppercase tracking-wider text-gold">{item.type}</p>
        </div>

        <h3 className="font-display text-xl sm:text-2xl mb-3 leading-tight">{item.title}</h3>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-xs font-mono text-silver">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} /> {item.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} /> {item.location}
          </span>
          {item.speakers.length > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Users size={12} /> {item.speakers.join(', ')}
            </span>
          )}
        </div>

        <p className="text-sm text-paper/85 leading-relaxed mb-4">{item.summary}</p>

        {item.topics.length > 0 && (
          <div className="mb-4">
            <p className="font-mono text-[0.7rem] text-silver uppercase tracking-wider mb-2">
              Topics covered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.topics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-4 text-sm font-mono">
            {item.links.linkedinPost && (
              <a
                href={item.links.linkedinPost}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-azure hover:text-gold transition-colors"
              >
                <ExternalLink size={14} /> LinkedIn post
              </a>
            )}
            {item.links.hostSite && (
              <a
                href={item.links.hostSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-azure hover:text-gold transition-colors"
              >
                <ExternalLink size={14} /> Host site
              </a>
            )}
          </div>

          {!item.isPlaceholder && (
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
          )}
        </div>
      </div>

      {/* Reflection panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-rule"
          >
            <div className="p-6 bg-ink/40">
              <p className="font-mono text-xs text-silver uppercase tracking-wider mb-4">
                Reflection
              </p>
              {hasReflection ? (
                <div className="space-y-3 text-sm leading-relaxed">
                  {item.reflection.takeaway && (
                    <p>
                      <strong className="text-gold">Key takeaway.</strong>{' '}
                      {item.reflection.takeaway}
                    </p>
                  )}
                  {item.reflection.surprise && (
                    <p>
                      <strong className="text-gold">What surprised me.</strong>{' '}
                      {item.reflection.surprise}
                    </p>
                  )}
                  {item.reflection.application && (
                    <p>
                      <strong className="text-gold">How I'd apply this.</strong>{' '}
                      {item.reflection.application}
                    </p>
                  )}
                  {item.reflection.questions && (
                    <p>
                      <strong className="text-gold">Questions it raised.</strong>{' '}
                      {item.reflection.questions}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-sm text-silver italic leading-relaxed">
                  <p>
                    <strong className="text-paper not-italic">Key takeaway.</strong>{' '}
                    [The one thing from this session that changed how you think
                    about data engineering.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">What surprised me.</strong>{' '}
                    [A counter-intuitive insight, a number you didn't expect,
                    or a real-world constraint you hadn't appreciated.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">How I'd apply this.</strong>{' '}
                    [A concrete way you can use this in your current or next
                    project.]
                  </p>
                  <p>
                    <strong className="text-paper not-italic">Questions it raised.</strong>{' '}
                    [Two or three questions you'd want to ask the speakers if
                    you had another session.]
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

export default function IndustryEngagement() {
  return (
    <section id="industry" className="py-20 border-t border-rule">
      <p className="section-label">[ 04 · industry engagement ]</p>
      <h2 className="heading-display text-3xl sm:text-5xl mb-3">
        Industry talks &amp; visits
      </h2>
      <p className="text-silver text-lg max-w-2xl mb-8">
        Sessions and visits where I got to step outside coursework and see how
        the industry actually operates. Each comes with a reflection on what
        carried over into my own work.
      </p>

      <div className="space-y-5">
        {industryEngagements.map((item, i) => (
          <EngagementCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
