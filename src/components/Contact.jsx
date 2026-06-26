import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import SectionHeader from './SectionHeader'
import TerminalWindow from './TerminalWindow'

const channels = [
  { id: 'email', key: 'email', value: 'fiqdnsh@gmail.com', href: 'mailto:fiqdnsh@gmail.com', icon: Mail, external: false },
  { id: 'github', key: 'github', value: 'github.com/fiqdanish', href: 'https://github.com/fiqdanish', icon: Github, external: true },
  { id: 'linkedin', key: 'linkedin', value: 'linkedin.com/in/afiqdanish279', href: 'https://www.linkedin.com/in/afiqdanish279/', icon: Linkedin, external: true },
]

const meta = [
  { key: 'status', value: 'currently on internship' },
  { key: 'graduating', value: '2027' },
  { key: 'location', value: 'Puchong, Selangor, MY' },
]

export default function Contact() {
  return (
    <section id="contact" className="container-page border-t border-term-line py-20">
      <SectionHeader
        index="[05]"
        log="reading_metadata..."
        title="contact"
        comment="open to data engineering & analytics internships — email is fastest."
        command="cat metadata.json"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <TerminalWindow title="metadata.json">
          <pre className="font-mono text-sm leading-relaxed">
            <span className="text-muted">{'{'}</span>
            {'\n'}
            {channels.map(({ id, key, value, href, icon: Icon, external }) => (
              <span key={id}>
                {'  '}
                <span className="text-rust">&quot;{key}&quot;</span>
                <span className="text-muted">: </span>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg underline decoration-rust/40 underline-offset-2 transition-colors hover:text-rust"
                >
                  <Icon size={13} className="text-rust" />
                  &quot;{value}&quot;
                </a>
                <span className="text-muted">,</span>
                {'\n'}
              </span>
            ))}
            {meta.map(({ key, value }, i) => (
              <span key={key}>
                {'  '}
                <span className="text-rust">&quot;{key}&quot;</span>
                <span className="text-muted">: </span>
                <span className="text-tag-green">&quot;{value}&quot;</span>
                <span className="text-muted">{i === meta.length - 1 ? '' : ','}</span>
                {'\n'}
              </span>
            ))}
            <span className="text-muted">{'}'}</span>
          </pre>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
