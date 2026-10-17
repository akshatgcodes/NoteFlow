# NoteFlow — Product Requirements Document

**Status:** Final (v1 shipped)
**Owner:** Akshat Gupta
**One-liner:** A Markdown notes system with a CLI for writing and a web reader with auto-tagging, tag filters and highlighted search.

---

## 1. Problem

Developers keep technical notes (cheat sheets, algorithm notes, setup steps) in scattered Markdown files or heavy apps like Notion. Plain files are portable but hard to browse and search. Apps are searchable but lock the notes in. And in both, tagging is manual, so it usually doesn't happen.

---

## 2. Goals (v1)

1. Create a note from the terminal with content from an argument, a file or stdin.
2. Tag every new note automatically from a keyword → tag map, with no manual tagging.
3. List and search notes from the CLI.
4. Read notes in a browser as rendered Markdown with syntax-highlighted code.
5. Filter the web list by tag and search with matches highlighted inside the note.
6. Live, browsable demo at [noteflow.akshatgcodes.in](https://noteflow.akshatgcodes.in) with sample notes.

---

## 3. Non-Goals (explicit scope cuts)

- **Editing in the browser** — the web UI is a reader. Notes are written with the CLI or any editor.
- **Sync / accounts** — notes are local files. Git is the sync layer.
- **Re-tagging old notes** — tags are computed when a note is created and stored in its frontmatter.
- **Attachments** — text only.

---

## 4. Users

**Primary:** A developer who writes technical notes in the terminal and wants to read and find them easily.

**Secondary:** Recruiters and engineers trying the hosted reader with the five sample notes (DSA, Flask, git, Docker, SQL).

---

## 5. User Stories

1. *As a developer,* I run `noteflow.py new "Binary Search" --content "..."` so that a tagged note is saved without opening an editor.
2. *As a developer,* I run `noteflow.py search "join"` so that I find the right note from the terminal.
3. *As a reader,* I click the **DSA** tag so that I only see algorithm notes.
4. *As a reader,* I search "docker" so that matching notes are listed and the word is highlighted inside the note, code blocks included.
5. *As a developer,* I add `"kubernetes": "DevOps"` to `config.json` so that future notes about Kubernetes are tagged automatically.

---

## 6. Functional Requirements

### 6.1 CLI

- `new TITLE [--content TEXT | --file PATH]`. Without either, content is read from stdin.
- The slug comes from the title (`[a-z0-9-]`). Duplicates get `-2`, `-3`… so a note is never overwritten.
- `list` prints every note with its slug, created date and tags.
- `search QUERY` prints matches with a short snippet around each hit.
- `serve [--port N] [--debug]` starts the web reader on `127.0.0.1`.

### 6.2 Auto-tagging

- Each key in `config.json` (except `_comment`) is matched as a case-insensitive substring of the content.
- A value can be one tag or a list of tags. All matches are collected and stored in the note's frontmatter.

### 6.3 Web reader

- `/notes` lists notes newest first, with a snippet, filterable by `?tag=` and `?q=` (title or body).
- `/note/<slug>` renders the note. With `?q=`, every match in text is wrapped in `<mark>`.
- `/pygments.css` serves the code highlighting styles.

---

## 7. Non-Functional Requirements

- **Portability:** notes are plain Markdown with a readable header and open in any editor.
- **Safety:** creating a note never overwrites an existing file.
- **Correctness:** search highlighting never edits inside HTML tags, so the rendered markup stays valid.
- **Cost:** no database or paid services. The hosted reader is a free Vercel function.

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Auto-tagging | Every sample note gets at least one tag from `config.json` |
| Search | A term inside a fenced code block is highlighted without breaking the code's styling |
| Demo | Landing page → reading a note in one click |

---

## 9. Risks & Open Questions

- **Substring matching** — keywords match inside other words, so `"api"` also matches "rapid". A key can include spaces (like `"git "`) to narrow a match.
- **Raw HTML in notes** — Markdown can contain raw HTML, which is rendered as-is. Fine for your own notes, not for untrusted input.
- **Scale** — every request reads every note from disk. Fine for hundreds of notes, slow for many thousands.

---

## 10. v2 Candidates

- Editing in the web UI, gated by a login.
- A `retag` command that re-runs auto-tagging on existing notes after `config.json` changes.
- Word-boundary keyword matching.

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
