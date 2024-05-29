import TagPill from "./TagPill";

const TAGS = ["DSA", "Web-Dev", "DevOps", "Database", "Tools"];

const NOTES: {
  title: string;
  tag: string;
  created: string;
  snippet: React.ReactNode;
}[] = [
  {
    title: "SQL Joins Explained",
    tag: "Database",
    created: "May 18",
    snippet: (
      <>
        A SQL <mark className="hl">JOIN</mark> combines rows from two or
        more tables based on a related column. INNER{" "}
        <mark className="hl">JOIN</mark> returns only matching rows...
      </>
    ),
  },
  {
    title: "Binary Search Notes",
    tag: "DSA",
    created: "May 14",
    snippet:
      "Binary search runs in O(log n) time by repeatedly halving the search interval over a sorted array...",
  },
  {
    title: "Flask Routing Basics",
    tag: "Web-Dev",
    created: "May 11",
    snippet:
      "Routes map a URL path to a view function via @app.route(). Dynamic segments like <slug> are passed as arguments...",
  },
  {
    title: "Docker Basics",
    tag: "DevOps",
    created: "May 9",
    snippet:
      "A Dockerfile describes an image layer by layer. docker build tags an image; docker run starts a container from it...",
  },
  {
    title: "Git Cheatsheet",
    tag: "Tools",
    created: "May 6",
    snippet:
      "git commit -m records staged changes. git rebase -i rewrites history interactively. Use git stash to shelve work...",
  },
];

export default function BrowserMock() {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
    >
      {/* browser chrome */}
      <div
        className="flex items-center gap-3 border-b px-4 py-2.5"
        style={{ borderColor: "var(--border)", background: "var(--bg-sunken)" }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#f87171" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#fbbf24" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#4ade80" }} />
        </div>
        <div
          className="flex-1 truncate rounded-md border px-3 py-1 text-xs font-mono"
          style={{ borderColor: "var(--border)", background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
        >
          localhost:5000/?q=join
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* sidebar */}
        <aside
          className="shrink-0 border-b px-4 py-4 sm:w-40 sm:border-r sm:border-b-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>
            Tags
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 sm:flex-col sm:items-start">
            {TAGS.map((t) => (
              <a key={t} className="block">
                <TagPill tag={t} />
              </a>
            ))}
          </div>
        </aside>

        {/* note list */}
        <div className="min-w-0 flex-1 p-4">
          <div
            className="mb-3 flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)", background: "var(--bg-sunken)" }}
          >
            <span style={{ color: "var(--fg-muted)" }}>⌕</span>
            <span>join</span>
            <span
              className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: "var(--accent-soft)", color: "var(--accent-fg)" }}
            >
              1 match
            </span>
          </div>

          <ul className="flex flex-col gap-2.5">
            {NOTES.map((n) => (
              <li
                key={n.title}
                className="rounded-lg border px-3.5 py-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{n.title}</span>
                  <span className="shrink-0 text-[11px]" style={{ color: "var(--fg-muted)" }}>
                    {n.created}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {n.snippet}
                </p>
                <div className="mt-2">
                  <TagPill tag={n.tag} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
