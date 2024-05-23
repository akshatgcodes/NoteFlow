# NoteFlow

A local Markdown notes system with two interfaces: a fast CLI for writing
notes from the terminal, and a Flask web server for reading them as
clean, formatted, syntax-highlighted HTML.

Basically a personal Notion — local, offline, and yours — built with
Python, `argparse`, and Flask.

## X Factor: auto-tagging, tag filtering, highlighted search

NoteFlow doesn't make you tag notes by hand.

- **Auto-tagging.** `config.json` defines a keyword -> tag map (e.g.
  `"binary search": "DSA"`, `"flask": "Web-Dev"`, `"docker": "DevOps"`).
  Every time you create a note with `noteflow.py new`, the content is
  scanned (case-insensitively) against every keyword in the config, and
  any matching tags are attached automatically and saved into the note's
  frontmatter. No manual tagging required.
- **Tag filtering.** The web UI sidebar lists every tag currently in use.
  Click one (e.g. "DSA") and the note list server-side filters to only
  notes carrying that tag (`GET /?tag=DSA`).
- **Highlighted full-text search.** Search from the CLI (`search`
  subcommand) or from the web UI search box. In the web UI, the matching
  term is wrapped in `<mark>` and highlighted **inline inside the
  rendered note**, without touching the surrounding HTML — so search
  terms that happen to fall inside a syntax-highlighted code block still
  highlight correctly instead of breaking the markup.

## Key concepts demonstrated

- `argparse` subcommands (`new`, `list`, `search`, `serve`) for the CLI
- File system operations reading/writing `.md` files with a lightweight
  frontmatter header (title, slug, created date, tags)
- The `markdown` library for Markdown -> HTML rendering, with the
  `fenced_code` + `codehilite` extensions enabled
- `Pygments` for syntax highlighting of fenced code blocks, served as
  generated CSS at `/pygments.css`
- Flask routing, Jinja2 templates (`templates/base.html`,
  `templates/index.html`, `templates/note.html`)
- Auto-tagging logic (`auto_tag()` in `noteflow.py`) driven entirely by
  `config.json`, so the taxonomy can be extended without touching code
- Full-text search implemented both in the CLI (plain-text snippet
  match) and in the web UI (HTML-safe `<mark>` highlighting via
  `highlight_text()`, which splits rendered HTML into tag/text segments
  so only text nodes get wrapped)

## Project layout

```
NoteFlow/
├── noteflow.py          # single entry point: CLI + Flask app
├── config.json           # keyword -> tag map for auto-tagging
├── notes/                 # notes live here as .md files w/ frontmatter
│   ├── binary-search-notes.md   (demo)
│   ├── flask-routing-basics.md  (demo)
│   ├── git-cheatsheet.md        (demo)
│   ├── docker-basics.md         (demo)
│   └── sql-joins-explained.md   (demo)
├── templates/             # Jinja2 templates for the web UI
├── static/style.css       # web UI styling
├── requirements.txt
└── README.md
```

The five notes under `notes/` are **demo content** committed so the web
UI has something to show out of the box — they are not real personal
notes, just sample material covering DSA, Flask, git, Docker, and SQL so
auto-tagging and tag filtering have something to demonstrate.

## How a note is stored

Each note is a plain `.md` file with a small frontmatter header:

```
---
title: Binary Search Notes
slug: binary-search-notes
created: 2024-05-14T09:30:00
tags: DSA, Python
---

# Binary Search
...markdown body...
```

## Running it

Install dependencies (Python 3.8+):

```bash
python3 -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
```

### CLI

Create a note (content via `--content`, `--file`, or piped/typed stdin,
terminated with Ctrl-D):

```bash
python noteflow.py new "Binary Search Notes" --content "Binary search runs in O(log n)..."
# or
python noteflow.py new "My Note" --file my_note_source.md
# or, interactively:
python noteflow.py new "My Note"
# ...type content, then Ctrl-D
```

List all notes with their auto-extracted tags:

```bash
python noteflow.py list
```

Full-text search from the terminal:

```bash
python noteflow.py search "binary search"
```

### Web

```bash
python noteflow.py serve
# open http://localhost:5000
```

Use `--port` to change the port and `--debug` to run Flask in debug mode:

```bash
python noteflow.py serve --port 5050 --debug
```

From the web UI you can:

- Browse all notes, rendered as formatted HTML with syntax-highlighted
  code blocks
- Click a tag in the sidebar to filter the note list
  (`GET /?tag=<tag>`)
- Search with the top search box; matches are highlighted inline on the
  note detail page (`GET /note/<slug>?q=<query>`) and used to filter the
  note list on the index page

## Extending auto-tagging

Add or edit entries in `config.json`. Keys are keywords/phrases matched
case-insensitively as substrings; values are a tag name (or a list of
tag names). No code changes needed — new notes pick up new rules
immediately.

## Platform

Any OS with Python 3.8+.

## Notes

Built as a focused, single-purpose tool - a local Markdown notes system, nothing more, nothing less.

## Troubleshooting

If something doesn't run as expected, double-check you're using the dependency versions noted above and running the exact commands from the "Run it" section.

## Possible Improvements

- More test coverage
- Better error messages for edge cases
- A cleaner CLI/UI polish pass
