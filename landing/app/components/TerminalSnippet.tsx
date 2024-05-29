export default function TerminalSnippet() {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--border)", background: "var(--code-bg)" }}
    >
      <div
        className="flex items-center gap-1.5 border-b px-4 py-2.5"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#f87171" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#fbbf24" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#4ade80" }} />
        <span className="ml-2 text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
          zsh
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed font-mono">
        <code>
          <span style={{ color: "var(--fg-muted)" }}>$ </span>
          <span>python noteflow.py new &quot;Binary Search Notes&quot; \{"\n"}</span>
          <span>    --content &quot;Binary search runs in O(log n)...&quot;{"\n"}</span>
          <span style={{ color: "#4ade80" }}>Saved note: Binary Search Notes{"\n"}</span>
          <span style={{ color: "var(--fg-muted)" }}>  file: notes/binary-search-notes.md{"\n"}</span>
          <span style={{ color: "var(--accent)" }}>  auto-tags: DSA{"\n\n"}</span>
          <span style={{ color: "var(--fg-muted)" }}>$ </span>
          <span>python noteflow.py search &quot;binary search&quot;{"\n"}</span>
          <span>- Binary Search Notes  [DSA]{"\n"}</span>
          <span style={{ color: "var(--fg-muted)" }}>
            {"    ...runs in O(log n) time by repeatedly halving the "}
          </span>
          <span
            className="rounded px-0.5 font-semibold"
            style={{ background: "var(--mark-bg)", color: "var(--mark-fg)" }}
          >
            search
          </span>
          <span style={{ color: "var(--fg-muted)" }}>{" interval..."}</span>
        </code>
      </pre>
    </div>
  );
}
