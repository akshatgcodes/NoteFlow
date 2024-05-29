import BrowserMock from "./BrowserMock";
import CodePreview from "./CodePreview";
import TerminalSnippet from "./TerminalSnippet";

export default function Preview() {
  return (
    <section id="preview" className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Preview
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            What it looks like
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Write from the terminal, read in the browser. Search once and the
            match is filtered in the list and highlighted inline on the note
            itself.
          </p>
        </div>

        <div className="mt-10">
          <BrowserMock />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <CodePreview />
          <TerminalSnippet />
        </div>
      </div>
    </section>
  );
}
