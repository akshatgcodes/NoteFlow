export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ color: "var(--fg-muted)" }}>
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
            style={{ background: "var(--accent)", color: "var(--bg-elevated)" }}
          >
            N
          </span>
          <span className="font-semibold" style={{ color: "var(--fg)" }}>
            NoteFlow
          </span>
          <span>— local Markdown notes, CLI + Flask.</span>
        </div>
        <div>Licensed under GPLv3.</div>
      </div>
    </footer>
  );
}
