function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
        style={{ background: "var(--accent-soft)", color: "var(--accent-fg)" }}
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
        {children}
      </div>
    </li>
  );
}

function Cmd({ children }: { children: React.ReactNode }) {
  return (
    <pre
      className="mt-1.5 overflow-x-auto rounded-md border px-3 py-2 text-[12.5px] font-mono"
      style={{ borderColor: "var(--border)", background: "var(--code-bg)", color: "var(--fg)" }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function RunIt() {
  return (
    <section id="run-it">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Run it
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Two interfaces, one notes folder
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Install once, then write from the terminal and read in the
            browser — both point at the same <span className="prose-inline"><code>notes/</code></span> directory.
          </p>
        </div>

        <div className="mt-6 max-w-xl rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>
            Setup
          </h3>
          <Cmd>
            python3 -m venv .venv &amp;&amp; source .venv/bin/activate{"\n"}
            pip install -r requirements.txt
          </Cmd>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-bold" style={{ color: "var(--accent-fg)" }}>
              CLI — write
            </h3>
            <ol className="mt-4 flex flex-col gap-4">
              <Step n={1}>
                Create a note (content via flag, file, or piped stdin):
                <Cmd>
                  python noteflow.py new &quot;My Note&quot; \{"\n"}
                  {"  "}--content &quot;...&quot;
                </Cmd>
              </Step>
              <Step n={2}>
                List every note with its auto-extracted tags:
                <Cmd>python noteflow.py list</Cmd>
              </Step>
              <Step n={3}>
                Full-text search from the terminal:
                <Cmd>python noteflow.py search &quot;binary search&quot;</Cmd>
              </Step>
            </ol>
          </div>

          <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-bold" style={{ color: "var(--accent-fg)" }}>
              Web — read
            </h3>
            <ol className="mt-4 flex flex-col gap-4">
              <Step n={1}>
                Start the Flask server:
                <Cmd>python noteflow.py serve</Cmd>
              </Step>
              <Step n={2}>
                Open it in your browser:
                <Cmd>http://localhost:5000</Cmd>
              </Step>
              <Step n={3}>
                Browse rendered notes, filter by tag, or search — matches
                highlight inline on the note page.
                <Cmd>
                  python noteflow.py serve \{"\n"}
                  {"  "}--port 5050 --debug
                </Cmd>
              </Step>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
