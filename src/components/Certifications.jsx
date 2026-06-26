import { motion } from 'framer-motion'
import { BadgeCheck, ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/certifications'
import SectionHeader from './SectionHeader'
import Tag from './Tag'

const TAG_COLORS = ['teal', 'violet', 'green', 'blue']

export default function Certifications() {
  return (
    <section id="certifications" className="container-page border-t border-term-line py-20">
      <SectionHeader
        index="[03]"
        log="verifying_credentials..."
        title="credentials"
        comment="verified certifications — click any card to verify on the issuer."
        command="cat credentials.json | jq '.'"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group panel panel-hover block border-l-2 border-l-rust p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <BadgeCheck size={16} className="text-rust" />
              <span className="font-mono text-[0.7rem] text-muted">{cert.issued}</span>
            </div>

            <h3 className="mb-1.5 font-mono text-base font-bold leading-snug text-fg">
              {cert.name}
            </h3>
            <p className="mb-3 font-mono text-xs text-rust">{cert.issuer}</p>
            <p className="mb-4 text-xs leading-relaxed text-fg/75">{cert.description}</p>

            <div className="mb-4 flex flex-wrap gap-1.5">
              {cert.skills.map((s, j) => (
                <Tag key={s} color="rust">
                  {s}
                </Tag>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-rust">
              verify <ArrowUpRight size={13} />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
