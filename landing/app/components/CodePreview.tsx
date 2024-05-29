export default function CodePreview() {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--border)", background: "var(--code-bg)" }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium"
        style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
      >
        <span>binary-search-notes.md</span>
        <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: "var(--bg-sunken)" }}>
          codehilite
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed font-mono">
        <code>
          <span style={{ color: "#8b949e" }}># Binary Search{"\n"}</span>
          {"\n"}
          <span style={{ color: "#6a737d" }}># O(log n) search over a sorted array{"\n"}</span>
          <span style={{ color: "#d73a49" }}>def</span>{" "}
          <span style={{ color: "#6f42c1" }}>binary_search</span>
          <span>(arr, target):{"\n"}</span>
          <span>    lo, hi = </span>
          <span style={{ color: "#005cc5" }}>0</span>
          <span>, </span>
          <span style={{ color: "#6f42c1" }}>len</span>
          <span>(arr) - </span>
          <span style={{ color: "#005cc5" }}>1</span>
          {"\n"}
          <span style={{ color: "#d73a49" }}>    while</span>
          <span> lo &lt;= hi:{"\n"}</span>
          <span>        mid = (lo + hi) </span>
          <span style={{ color: "#d73a49" }}>{"//"}</span>
          <span> </span>
          <span style={{ color: "#005cc5" }}>2</span>
          {"\n"}
          <span style={{ color: "#d73a49" }}>        if</span>
          <span> arr[mid] == target:{"\n"}</span>
          <span style={{ color: "#d73a49" }}>            return</span>
          <span> mid{"\n"}</span>
          <span style={{ color: "#d73a49" }}>        elif</span>
          <span> arr[mid] &lt; target:{"\n"}</span>
          <span>            lo = mid + </span>
          <span style={{ color: "#005cc5" }}>1</span>
          {"\n"}
          <span style={{ color: "#d73a49" }}>        else</span>
          <span>:{"\n"}</span>
          <span>            hi = mid - </span>
          <span style={{ color: "#005cc5" }}>1</span>
        </code>
      </pre>
      <div
        className="border-t px-4 py-2 text-[11px]"
        style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
      >
        Rendered via <span className="prose-inline"><code>markdown</code></span> (fenced_code + codehilite) → served with a Pygments-generated{" "}
        <span className="prose-inline"><code>/pygments.css</code></span>
      </div>
    </div>
  );
}
