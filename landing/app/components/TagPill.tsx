const TAG_STYLES: Record<string, { bg: string; fg: string }> = {
  DSA: { bg: "var(--tag-dsa-bg)", fg: "var(--tag-dsa-fg)" },
  "Web-Dev": { bg: "var(--tag-web-bg)", fg: "var(--tag-web-fg)" },
  DevOps: { bg: "var(--tag-devops-bg)", fg: "var(--tag-devops-fg)" },
  Database: { bg: "var(--tag-db-bg)", fg: "var(--tag-db-fg)" },
  Tools: { bg: "var(--tag-tools-bg)", fg: "var(--tag-tools-fg)" },
};

export default function TagPill({
  tag,
  active = false,
}: {
  tag: string;
  active?: boolean;
}) {
  const style = TAG_STYLES[tag] ?? {
    bg: "var(--bg-sunken)",
    fg: "var(--fg-muted)",
  };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase"
      style={{
        background: style.bg,
        color: style.fg,
        outline: active ? `2px solid ${style.fg}` : undefined,
        outlineOffset: active ? "1px" : undefined,
      }}
    >
      {tag}
    </span>
  );
}
