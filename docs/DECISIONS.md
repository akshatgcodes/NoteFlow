# Engineering Decisions — NoteFlow

---

## Decision 1 — Notes are plain Markdown files, not a database

**Context:** Notes need to be portable, easy to edit and easy to back up.

**Decision:** One `.md` file per note in `notes/`, with a small `---` frontmatter header for title, slug, created date and tags.

**Reason:** The files open in any editor, diff cleanly in git, and work with no server at all. The web reader just reads the folder. Git is the sync and backup layer.

**Tradeoff:** Listing and searching read every file on every request. Fine for a personal notes folder, slow at many thousands of notes.

---

## Decision 2 — Auto-tagging from a config file

**Context:** Manual tagging tends not to happen, which makes tag filtering useless.

**Decision:** `config.json` maps keywords to tags. On `new`, the content is scanned case-insensitively and every matching tag is stored in the frontmatter.

**Reason:** Tagging costs the user nothing, and the taxonomy can grow by editing JSON instead of code. Values can be a list, so one keyword can add several tags.

**Tradeoff:** Substring matching gives some false positives (`"api"` matches "rapid"), and tags are fixed at creation, so changing the config doesn't re-tag old notes.

---

## Decision 3 — Highlight search terms on rendered HTML, text nodes only

**Context:** Highlighting the Markdown source before rendering would break fenced code. Highlighting the HTML naively would corrupt tags and attributes.

**Decision:** `highlight_text()` splits the HTML into tag and text segments and only wraps matches in text segments.

**Reason:** Tags pass through untouched, so code blocks keep their Pygments styling and attributes never get `<mark>` inside them, yet terms inside code still light up.

**Tradeoff:** A query could match inside an HTML entity's text (for example `amp` in `&amp;`). That's rare enough to accept.

---

## Decision 4 — One file for the CLI and the web app, with Flask imported lazily

**Context:** The project has two interfaces over the same storage code.

**Decision:** `noteflow.py` holds storage, CLI and the `create_app()` factory, and Flask is only imported inside `create_app()`.

**Reason:** One source of truth for parsing and storage. The CLI starts fast and works even without Flask installed.

**Tradeoff:** The file mixes concerns. Splitting it into modules would be the next refactor as it grows.

---

## Decision 5 — Landing page and reader on one Vercel project

**Context:** The landing page used to be a separate site.

**Decision:** One Vercel project. `index.py` exposes `app = create_app()`, `vercel.json` serves the static landing page at `/`, and the note list moved from `/` to `/notes`.

**Reason:** One domain, and the landing page's main button opens the real reader. The committed sample notes ship with the function, so the demo always works.

**Tradeoff:** The hosted reader is read-only. New notes only appear after they're committed and pushed.

---

## What I'd do differently in v2

- **Word-boundary matching** for auto-tagging, to cut false positives.
- **A `retag` command** to re-apply `config.json` to existing notes.
- **Split `noteflow.py`** into storage, CLI and web modules.

---

## Explicit non-decisions (deferred to v2)

| Feature | Why deferred |
|---|---|
| Web editing | Needs auth and a writable store. The hosted filesystem is read-only |
| Full-text index | A linear scan is instant at personal-notes scale |
| Attachments | Text-first tool. Images can be linked from Markdown |

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
