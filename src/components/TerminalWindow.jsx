/**
 * macOS-style terminal window chrome: a titlebar with the three traffic-light
 * dots and a title, wrapping arbitrary content.
 */
export default function TerminalWindow({
  title = '~/portfolio — zsh',
  children,
  className = '',
  bodyClassName = 'p-5 sm:p-7',
}) {
  return (
    <div className={`term-window ${className}`}>
      <div className="term-titlebar">
        <span className="term-dot" style={{ background: '#ff5f56' }} />
        <span className="term-dot" style={{ background: '#ffbd2e' }} />
        <span className="term-dot" style={{ background: '#27c93f' }} />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
