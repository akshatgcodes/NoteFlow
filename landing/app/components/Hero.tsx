import TagPill from "./TagPill";

export default function Hero() {
  return (
    <section id="top" className="bg-noise border-b" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide" style={{ color: "var(--fg-muted)" }}>
          <span
            className="rounded-full px-2.5 py-1"
            style={{ background: "var(--accent-soft)", color: "var(--accent-fg)" }}
          >
            ● local &amp; offline
          </span>
          <span>CLI + Flask web reader</span>
          <span>·</span>
          <span>GPLv3</span>
        </div>

        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl">
          Markdown notes that{" "}
          <span style={{ color: "var(--accent)" }}>tag themselves.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          NoteFlow is a local Markdown notes system with two interfaces: a fast
          CLI for writing from the terminal, and a Flask web server for reading
          notes as clean, syntax-highlighted HTML. Basically a personal
          Notion — local, offline, and yours.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#run-it"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{ background: "var(--accent)", color: "var(--bg-elevated)" }}
          >
            Run it locally
          </a>
          <a
            href="#x-factor"
            className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: "var(--border)" }}
          >
            See the X factor
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          <TagPill tag="DSA" />
          <TagPill tag="Web-Dev" />
          <TagPill tag="DevOps" />
          <TagPill tag="Database" />
          <TagPill tag="Tools" />
        </div>
      </div>
    </section>
  );
}
