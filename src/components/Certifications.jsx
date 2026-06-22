import { motion } from 'framer-motion'
import { Award, ExternalLink} from 'lucide-react'
import { certifications} from '../data/certifications'

const ACCENT = {
  gold:   'border-gold',
  azure:  'border-azure',
  bronze: 'border-bronze',
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 border-t border-rule">
      <p className="section-label">[ 03 · certifications]</p>
      <h2 className="heading-display text-3xl sm:text-5xl mb-3">
        Certifications
      </h2>
      <p className="text-silver text-lg max-w-2xl mb-10">
        Verified credentials and milestones from across the journey. Click
        any certification to verify it on the issuing platform.
      </p>

      {/* Certifications grid */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-gold" />
          <h3 className="font-mono text-sm text-silver uppercase tracking-wider">
            Certifications
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group bg-ink-2 p-6 rounded border-l-4 ${ACCENT[cert.accent]} hover:bg-ink-3 transition-colors block`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="font-mono text-xs text-silver uppercase tracking-wider">
                  {cert.issued}
                </p>
                <ExternalLink
                  size={14}
                  className="text-silver group-hover:text-gold transition-colors"
                />
              </div>
              <h4 className="font-display text-lg mb-2 leading-snug">{cert.name}</h4>
              <p className="font-mono text-xs text-gold mb-3">{cert.issuer}</p>
              <p className="text-sm text-paper/85 mb-4 leading-relaxed">{cert.description}</p>
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((s) => (
                  <span key={s} className="chip text-[0.7rem] py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
