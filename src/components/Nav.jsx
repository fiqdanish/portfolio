import { useEffect, useState } from 'react'

const links = [
  { href: '#about',          num: '[01]', label: 'about' },
  { href: '#projects',       num: '[02]', label: 'workspaces' },
  { href: '#certifications', num: '[03]', label: 'credentials' },
  { href: '#industry',       num: '[04]', label: '~/logs' },
  { href: '#contact',        num: '[05]', label: 'contact' },
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
    <header className="sticky top-0 z-40 border-b border-term-line bg-term-bg/80 backdrop-blur-sm">
      <nav className="container-page py-3">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:gap-x-8 font-mono text-sm">
          {links.map(({ href, num, label }) => {
            const active = activeId === href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`group inline-flex items-center gap-1.5 transition-colors ${
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span className="text-rust">{num}</span>
                  <span className={active ? 'font-bold' : ''}>{label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
