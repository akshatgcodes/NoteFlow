export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold"
            style={{ background: "var(--accent)", color: "var(--bg-elevated)" }}
          >
            N
          </span>
          <span>NoteFlow</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex" style={{ color: "var(--fg-muted)" }}>
          <a href="#x-factor" className="transition-colors hover:opacity-80">
            X Factor
          </a>
          <a href="#preview" className="transition-colors hover:opacity-80">
            Preview
          </a>
          <a href="#stack" className="transition-colors hover:opacity-80">
            Stack
          </a>
          <a href="#run-it" className="transition-colors hover:opacity-80">
            Run it
          </a>
        </nav>
        <a
          href="#run-it"
          className="rounded-md px-3.5 py-1.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
          style={{ background: "var(--accent)", color: "var(--bg-elevated)" }}
        >
          Get started
        </a>
      </div>
    </header>
  );
}
