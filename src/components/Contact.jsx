import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: 'fiqdnsh@gmail.com',
    href: 'mailto:fiqdnsh@gmail.com',
    icon: Mail,
    note: 'Fastest response',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/fiqdanish',
    href: 'https://github.com/fiqdanish',
    icon: Github,
    note: 'Code, projects, contributions',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/afiqdanish279',
    href: 'https://www.linkedin.com/in/afiqdanish279/',
    icon: Linkedin,
    note: 'Professional updates',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 border-t border-rule">
      <p className="section-label">[ 05 · contact ]</p>
      <h2 className="heading-display text-3xl sm:text-5xl mb-4">Get in touch</h2>
      <p className="text-silver text-lg max-w-2xl mb-10">
        Open to data engineering internships and graduate roles starting{' '}
        <span className="text-paper">2027</span>. Three ways to reach me —
        email is fastest.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map(({ id, label, value, href, icon: Icon, note }, i) => (
          <motion.a
            key={id}
            href={href}
            target={id !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group glass p-6 rounded border border-rule hover:border-gold transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-ink flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
              <ArrowUpRight
                size={18}
                className="text-silver group-hover:text-gold transition-colors"
              />
            </div>
            <p className="font-mono text-xs text-silver uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="font-display text-base text-paper mb-2 break-all">{value}</p>
            <p className="text-xs text-silver">{note}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
