import { useEffect, useState } from 'react'

const links = [
  { href: '#about',          label: 'About' },
  { href: '#projects',       label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#industry',       label: 'Industry' },
  { href: '#contact',        label: 'Contact' },
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
    <header className="sticky top-0 z-40 glass-strong border-b border-rule">
      <div className="container-page flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-mono text-sm bg-paper text-ink px-2 py-1 rounded">af</span>
          <span className="font-display text-lg hidden sm:inline group-hover:text-gold transition-colors">
            Afiq
          </span>
        </a>
        <nav>
          <ul className="flex gap-4 sm:gap-7">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    activeId === href.slice(1)
                      ? 'text-paper'
                      : 'text-silver hover:text-paper'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
