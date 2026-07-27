import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { spring, springFast } from '../lib/motion'

const links = [
  { href: '#about',          num: '01', label: 'about' },
  { href: '#projects',       num: '02', label: 'workspaces' },
  { href: '#certifications', num: '03', label: 'credentials' },
  { href: '#industry',       num: '04', label: '~/logs' },
  { href: '#contact',        num: '05', label: 'contact' },
]

export default function Nav() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    links.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40">
      {/* §12 translucent structural chrome — content dissolves under the blur */}
      <div
        className="border-b border-white/[0.06]"
        style={{
          background: 'rgba(12, 11, 16, 0.5)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        }}
      >
        <nav className="container-page py-2.5">
          <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {links.map(({ href, num, label }) => {
              const active = activeId === href.slice(1)
              return (
                <li key={href}>
                  <motion.a
                    href={href}
                    whileTap={{ scale: 0.94 }}
                    transition={springFast}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm transition-colors ${
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {/* §7 active indicator springs between tabs (shared layout) */}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={spring}
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.09]"
                      />
                    )}
                    <span className="relative text-rust">{num}</span>
                    <span className="relative">{label}</span>
                  </motion.a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
