const BADGES = [
  "Python 3",
  "argparse",
  "Flask",
  "Jinja2",
  "markdown",
  "Pygments",
  "Regex",
  "Filesystem I/O",
  "Frontmatter parsing",
  "GPLv3",
];

const CONCEPTS = [
  {
    title: "CLI subcommands",
    body: "argparse wires new / list / search / serve into one entry point, noteflow.py.",
  },
  {
    title: "Frontmatter storage",
    body: "Every note is a plain .md file with a lightweight header: title, slug, created, tags.",
  },
  {
    title: "Markdown → HTML",
    body: "The markdown library renders bodies with fenced_code, codehilite, tables, and toc extensions.",
  },
  {
    title: "Pygments highlighting",
    body: "Fenced code blocks are syntax-highlighted and styled via a generated /pygments.css route.",
  },
  {
    title: "Auto-tag engine",
    body: "auto_tag() scans content against config.json's keyword map so the taxonomy grows without code changes.",
  },
  {
    title: "Safe inline highlighting",
    body: "highlight_text() splits rendered HTML into tag/text segments so only text nodes get wrapped in <mark>.",
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Under the hood
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Key concepts &amp; stack
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <span
              key={b}
              className="rounded-md border px-3 py-1.5 text-sm font-medium font-mono"
              style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPTS.map((c) => (
            <div key={c.title} className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
