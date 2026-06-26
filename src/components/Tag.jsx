/**
 * Terminal tag / pill with a color variant. `prefix` lets callers render
 * `#hashtag` or `[bracket]` styles.
 */
const COLOR = {
  rust: 'tag-rust',
  teal: 'tag-teal',
  violet: 'tag-violet',
  green: 'tag-green',
  blue: 'tag-blue',
}

export default function Tag({ children, color = 'rust', prefix = '', className = '' }) {
  return (
    <span className={`tag ${COLOR[color] || 'tag-rust'} ${className}`}>
      {prefix}
      {children}
    </span>
  )
}
