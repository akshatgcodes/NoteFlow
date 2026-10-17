<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
       fill="none" stroke="#b45309" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/>
    <rect width="16" height="20" x="4" y="2" rx="2"/>
    <path d="M9.5 8h5"/><path d="M9.5 12H16"/><path d="M9.5 16H14"/>
  </svg>
</p>

<h1 align="center">NoteFlow</h1>

<p align="center">
  <strong>A Markdown notes system with a CLI for writing and a web reader with auto-tagging, tag filters and highlighted search.</strong>
</p>

<p align="center">
  <a href="https://noteflow.akshatgcodes.in">
    <img src="https://img.shields.io/badge/live_demo-b45309-b45309?style=flat-square" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white" alt="Markdown">
  <img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/license-GPL--3.0-b45309?style=flat-square" alt="License">
</p>

---

## What is NoteFlow?

NoteFlow keeps your notes as plain `.md` files and gives you two ways in: a fast `argparse` CLI for writing from the terminal, and a Flask web reader that renders them as clean, syntax-highlighted HTML. You never tag a note by hand. A keyword map in `config.json` tags every new note automatically, and the web UI lets you filter by tag and search with matches highlighted inside the rendered note.

> **Live demo →** [noteflow.akshatgcodes.in](https://noteflow.akshatgcodes.in)
> Click **Browse the live notes** to read the five sample notes, filter by tag and try a search.

---

## What you get

- **Auto-tagging** — `noteflow.py new` scans the content against a keyword → tag map and writes the tags into the note's frontmatter.
- **Tag filtering** — the sidebar lists every tag in use, and one click filters the list.
- **Highlighted search** — matches are wrapped in `<mark>` inside the rendered HTML, without breaking code blocks.
- **CLI + web** — `new`, `list`, `search` and `serve` subcommands in one file.

---

## Stack

| Layer | Tech |
|---|---|
| CLI | Python · `argparse` |
| Web | Flask 3 · Jinja2 · plain CSS · Next.js 16 static landing page |
| Rendering | `markdown` (`fenced_code`, `codehilite`, `tables`, `toc`) · Pygments |
| Storage | `.md` files with a small frontmatter header in `notes/` |
| Infra | Vercel (Python function + static landing) · GoDaddy DNS |

---

## Engineering Decisions

**Why plain Markdown files instead of a database?**
Notes stay readable and editable in any editor, diff cleanly in git, and need no server. The web reader just reads the folder.

**Why highlight search terms on the rendered HTML, not the Markdown?**
`highlight_text()` splits the HTML into tag and text segments and only wraps text. Terms inside syntax-highlighted code still highlight, and tag attributes are never touched.

**Why a config-driven tag map?**
The taxonomy lives in `config.json`, so adding a tag is a one-line edit with no code change.

**What would you do differently in v2?**
Add editing in the web UI. Today notes are written from the CLI, and the hosted reader is read-only.

---

## Docs

| Document | Description |
|---|---|
| [PRD](docs/PRD.md) | Product requirements — goals, user stories, non-goals |
| [Architecture](docs/ARCHITECTURE.md) | System design, data flow, component breakdown |
| [Decisions](docs/DECISIONS.md) | Every major technical decision and why |
| [Setup](docs/SETUP.md) | Local dev setup and CLI usage |
| [Deploy](docs/DEPLOY.md) | Production deployment, domains, rollback |
| [Contributing](CONTRIBUTING.md) | How to propose changes |
| [Changelog](CHANGELOG.md) | What changed in each release |
| [Security](SECURITY.md) | How to report a vulnerability |

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
