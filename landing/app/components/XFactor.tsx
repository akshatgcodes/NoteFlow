const FEATURES = [
  {
    icon: "◎",
    title: "Auto-tagging",
    body: (
      <>
        No manual tagging. <code>config.json</code> defines a keyword →
        tag map — things like <code>&quot;binary search&quot;: &quot;DSA&quot;</code>,{" "}
        <code>&quot;flask&quot;: &quot;Web-Dev&quot;</code>,{" "}
        <code>&quot;docker&quot;: &quot;DevOps&quot;</code>. Every time you run{" "}
        <code>noteflow.py new</code>, the note&apos;s content is scanned
        case-insensitively against every keyword, and matching tags are
        attached automatically into the note&apos;s frontmatter.
      </>
    ),
  },
  {
    icon: "▤",
    title: "Tag filtering",
    body: (
      <>
        The web UI sidebar lists every tag currently in use across your
        notes. Click one — say <code>DSA</code> — and the note list is
        filtered server-side to only notes carrying that tag, via a plain{" "}
        <code>GET /?tag=DSA</code>. No client-side state, no JS framework.
      </>
    ),
  },
  {
    icon: "◐",
    title: "Highlighted search",
    body: (
      <>
        Search from the CLI with <code>search</code>, or from the web
        search box. On the web, the matching term is wrapped in{" "}
        <code>&lt;mark&gt;</code> and highlighted{" "}
        <em>inline inside the rendered note</em> — the highlighter walks
        rendered HTML and only touches text nodes, so a search hit that
        happens to sit inside a syntax-highlighted code block still
        highlights cleanly instead of breaking the markup.
      </>
    ),
  },
];

export default function XFactor() {
  return (
    <section id="x-factor" className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            The X factor
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            You never touch a tag.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Most notes apps make tagging a chore, so it never happens.
            NoteFlow reads what you wrote and figures out where it belongs.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                style={{ background: "var(--accent-soft)", color: "var(--accent-fg)" }}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p
                className="prose-inline mt-2 text-sm leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
