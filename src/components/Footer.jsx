export default function Footer() {
  return (
    <footer className="container-page mt-8 border-t border-white/[0.06] py-10">
      <div className="flex flex-col gap-2 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-rust">afiq@portfolio</span>:<span className="text-tag-blue">~</span>$
          {' '}built by Afiq Danish · UTM · Faculty of Computing
        </p>
        <p>
          last_commit <time dateTime="2026-06-26">June 2026</time>
          <span className="caret" />
        </p>
      </div>
    </footer>
  )
}
