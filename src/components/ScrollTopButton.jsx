import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

/** Bottom-left circular scroll-to-top button; appears after scrolling down. */
export default function ScrollTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center
                 rounded-full border border-rust/40 bg-term-panel/85 text-rust backdrop-blur-sm
                 transition-colors hover:border-rust hover:bg-term-panel"
    >
      <ChevronUp size={18} />
    </button>
  )
}
