# NoteFlow — Architecture

---

## 1. Stack

| Layer | Tech |
|---|---|
| Language | Python 3.12 on Vercel, 3.8+ locally |
| CLI | `argparse` subcommands |
| Web | Flask 3 · Jinja2 · plain CSS |
| Markdown | `markdown` with `fenced_code`, `codehilite`, `tables`, `toc` |
| Syntax highlighting | Pygments (`friendly` style, served as CSS) |
| Storage | `notes/*.md` files with a frontmatter header |
| Landing page | Next.js 16 static export (`landing/`) · Tailwind CSS 4 |
| Hosting | Vercel: `@vercel/python` for Flask, `@vercel/static-build` for the landing page |

---

## 2. Components

```
noteflow.py       single entry point: config, note storage, CLI commands, Flask app factory
index.py          WSGI entry for hosting: app = create_app()
config.json       keyword -> tag map for auto-tagging
notes/            the notes, one .md file each (five sample notes are committed)
templates/        base layout, note list, note page
static/style.css  web reader styling
landing/          Next.js landing page, exported to static HTML
vercel.json       routes "/" to the landing page and everything else to index.py
```

### Note storage

Each note is `notes/<slug>.md`:

```
---
title: Binary Search Notes
slug: binary-search-notes
created: 2026-09-15T20:16:17
tags: DSA, Python
---

Binary search runs in O(log n)...
```

`slugify()` lowercases the title and collapses everything outside `[a-z0-9]` to `-`. `unique_path()` adds `-2`, `-3`… so a new note never overwrites an existing one. `load_all_notes()` parses every `.md` file and sorts by `created`, newest first.

### Auto-tagging

`auto_tag(content)` lowercases the content and checks every key from `config.json` (keys starting with `_` are skipped) as a substring. A value can be one tag or a list. The result is a sorted, de-duplicated list written into the frontmatter at creation time.

### Search highlighting

`highlight_text(html, query)` splits the rendered HTML with `re.split(r"(<[^>]+>)")`, so tags and text become separate segments. It wraps case-insensitive matches in `<mark class="hl">` in text segments only. Tags and their attributes are passed through untouched, which is why a term inside a Pygments-highlighted code block still highlights without breaking the spans.

### Flask app factory

`create_app()` imports Flask lazily, so the CLI commands (`new`, `list`, `search`) work without Flask installed.

---

## 3. Data Flow

```
Write:  noteflow.py new "Title" --content "..."
          --> auto_tag(content) via config.json
          --> slugify + unique_path
          --> write notes/<slug>.md with frontmatter

Read:   GET /notes?tag=DSA&q=search
          --> load_all_notes() (read + parse every file)
          --> filter by tag, then by title/body substring
          --> render list with 160-char snippets

        GET /note/<slug>?q=search
          --> parse notes/<slug>.md
          --> markdown -> HTML (codehilite)
          --> highlight_text(html, q)
          --> render note page
```

---

## 4. Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Landing page in production. Locally, redirects to `/notes` |
| `GET` | `/notes` | Note list, with `?tag=` and `?q=` filters and a tag sidebar |
| `GET` | `/note/<slug>` | Rendered note, with `?q=` highlighting |
| `GET` | `/pygments.css` | Generated Pygments CSS for `.codehilite` |

---

## 5. Security

- **Paths:** `/note/<slug>` uses Flask's default converter, which doesn't allow `/`, so a slug can't leave `notes/`.
- **Search input:** the query is escaped with `re.escape` and only wraps text that's already in the rendered HTML. Jinja2 escapes the query wherever it's shown.
- **Note content:** Markdown can contain raw HTML, which is rendered as-is. Notes are trusted input written by the owner; the hosted reader has no way to add notes.
- **Secrets:** none. The app has no env vars.

---

## 6. Error Handling & Reliability

| Failure | Behaviour |
|---|---|
| Unknown slug | 404 |
| Missing `config.json` | Auto-tagging returns no tags |
| Duplicate title | New note gets a `-2`, `-3`… slug |
| No content given to `new` | Reads stdin. On an empty terminal it prompts until Ctrl-D |

---

## 7. Deployment

1. The Vercel project `noteflow` is linked to `akshatgcodes/NoteFlow` and deploys every push to `master`.
2. `vercel.json` builds `landing/` as a static export served at `/`, serves `static/**` as files, and sends everything else to `index.py`.
3. The committed `notes/` folder ships inside the function bundle, so the hosted reader shows exactly what's in git.

Full steps are in [DEPLOY.md](DEPLOY.md).

---

## 8. Explicit Scope Cuts

- **Web editing** — the hosted filesystem is read-only, and editing would need auth.
- **Index / database** — a full scan is fast enough for a personal notes folder.
- **Re-tagging** — tags are computed once at creation.

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
