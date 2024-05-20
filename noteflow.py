#!/usr/bin/env python3
"""
NoteFlow - a local Markdown notes system with a CLI for writing and a
Flask web UI for reading.

X factor: auto-tagging. When a note is created, its content is scanned
against a keyword -> tag map (config.json) and matching tags are attached
automatically. The web UI lets you filter notes by tag and run a
full-text search that highlights the matching term inline.

Usage:
    python noteflow.py new "Binary Search Notes" [--content "..."] [--file path.md]
    python noteflow.py list
    python noteflow.py search "binary search"
    python noteflow.py serve [--port 5000] [--debug]
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NOTES_DIR = os.path.join(BASE_DIR, "notes")
CONFIG_PATH = os.path.join(BASE_DIR, "config.json")

FRONTMATTER_DELIM = "---"


# --------------------------------------------------------------------------
# Config / auto-tagging
# --------------------------------------------------------------------------

def load_config():
    """Load the keyword -> tag map, skipping the '_comment' key."""
    if not os.path.exists(CONFIG_PATH):
        return {}
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)
    return {k: v for k, v in raw.items() if not k.startswith("_")}


def auto_tag(content, config=None):
    """Scan content for configured keywords and return a sorted list of tags."""
    if config is None:
        config = load_config()
    text = content.lower()
    tags = set()
    for keyword, tag_value in config.items():
        if keyword.lower() in text:
            if isinstance(tag_value, list):
                tags.update(tag_value)
            else:
                tags.add(tag_value)
    return sorted(tags)


# --------------------------------------------------------------------------
# Note storage: each note is a .md file with a small frontmatter header
# --------------------------------------------------------------------------

def slugify(title):
    slug = title.strip().lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug).strip("-")
    return slug or "note"


def unique_path(slug):
    """Avoid clobbering an existing note with the same slug."""
    path = os.path.join(NOTES_DIR, f"{slug}.md")
    if not os.path.exists(path):
        return path
    n = 2
    while True:
        candidate = os.path.join(NOTES_DIR, f"{slug}-{n}.md")
        if not os.path.exists(candidate):
            return candidate
        n += 1


def build_frontmatter(meta):
    lines = [FRONTMATTER_DELIM]
    lines.append(f"title: {meta['title']}")
    lines.append(f"slug: {meta['slug']}")
    lines.append(f"created: {meta['created']}")
    lines.append(f"tags: {', '.join(meta['tags'])}")
    lines.append(FRONTMATTER_DELIM)
    return "\n".join(lines)


def parse_note_file(path):
    """Parse a .md note file into (meta dict, body markdown string)."""
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    meta = {
        "title": os.path.splitext(os.path.basename(path))[0],
        "slug": os.path.splitext(os.path.basename(path))[0],
        "created": "",
        "tags": [],
    }
    body = raw

    lines = raw.splitlines()
    if lines and lines[0].strip() == FRONTMATTER_DELIM:
        try:
            end = lines.index(FRONTMATTER_DELIM, 1)
        except ValueError:
            end = None
        if end is not None:
            header_lines = lines[1:end]
            for line in header_lines:
                if ":" not in line:
                    continue
                key, _, value = line.partition(":")
                key = key.strip().lower()
                value = value.strip()
                if key == "tags":
                    meta["tags"] = [t.strip() for t in value.split(",") if t.strip()]
                elif key in meta:
                    meta[key] = value
            body = "\n".join(lines[end + 1:]).lstrip("\n")

    meta["filename"] = os.path.basename(path)
    return meta, body


def save_note(title, content, tags):
    os.makedirs(NOTES_DIR, exist_ok=True)
    slug = slugify(title)
    path = unique_path(slug)
    final_slug = os.path.splitext(os.path.basename(path))[0]
    meta = {
        "title": title,
        "slug": final_slug,
        "created": datetime.now().isoformat(timespec="seconds"),
        "tags": tags,
    }
    text = build_frontmatter(meta) + "\n\n" + content.strip() + "\n"
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return path, meta


def load_all_notes():
    """Return a list of (meta, body) for every note, newest first."""
    if not os.path.isdir(NOTES_DIR):
        return []
    notes = []
    for filename in os.listdir(NOTES_DIR):
        if not filename.endswith(".md"):
            continue
        path = os.path.join(NOTES_DIR, filename)
        meta, body = parse_note_file(path)
        notes.append((meta, body))
    notes.sort(key=lambda pair: pair[0].get("created", ""), reverse=True)
    return notes


def find_note_by_slug(slug):
    path = os.path.join(NOTES_DIR, f"{slug}.md")
    if not os.path.exists(path):
        return None, None
    return parse_note_file(path)


# --------------------------------------------------------------------------
# CLI commands
# --------------------------------------------------------------------------

def cmd_new(args):
    title = args.title
    if args.content is not None:
        content = args.content
    elif args.file is not None:
        with open(args.file, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        if sys.stdin.isatty():
            print("Enter note content. Finish with Ctrl-D (EOF):")
        content = sys.stdin.read()

    if not content.strip():
        print("No content provided - note not saved.", file=sys.stderr)
        sys.exit(1)

    tags = auto_tag(content)
    path, meta = save_note(title, content, tags)

    print(f"Saved note: {meta['title']}")
    print(f"  file: {os.path.relpath(path, BASE_DIR)}")
    if tags:
        print(f"  auto-tags: {', '.join(tags)}")
    else:
        print("  auto-tags: (none matched - edit config.json to add keywords)")


def cmd_list(args):
    notes = load_all_notes()
    if not notes:
        print("No notes yet. Create one with: python noteflow.py new \"My Title\"")
        return

    for meta, _body in notes:
        tags = ", ".join(meta["tags"]) if meta["tags"] else "(untagged)"
        created = meta.get("created", "")
        print(f"- {meta['title']}  [{tags}]")
        print(f"    slug: {meta['slug']}  created: {created}")


def _snippet(text, index, span, width=60):
    start = max(0, index - width // 2)
    end = min(len(text), index + span + width // 2)
    prefix = "..." if start > 0 else ""
    suffix = "..." if end < len(text) else ""
    return prefix + text[start:end].replace("\n", " ") + suffix


def cmd_search(args):
    query = args.query
    notes = load_all_notes()
    query_lower = query.lower()
    hits = 0

    for meta, body in notes:
        haystack = f"{meta['title']}\n{body}"
        idx = haystack.lower().find(query_lower)
        if idx == -1:
            continue
        hits += 1
        tags = ", ".join(meta["tags"]) if meta["tags"] else "(untagged)"
        print(f"- {meta['title']}  [{tags}]")
        print(f"    ...{_snippet(haystack, idx, len(query))}...")

    if hits == 0:
        print(f"No notes match '{query}'.")


def cmd_serve(args):
    app = create_app()
    print(f"NoteFlow web UI running at http://localhost:{args.port}")
    app.run(host="127.0.0.1", port=args.port, debug=args.debug)


# --------------------------------------------------------------------------
# Flask web app (built lazily so the CLI-only commands don't need Flask)
# --------------------------------------------------------------------------

def highlight_text(html, query):
    """Wrap case-insensitive matches of `query` in <mark>, without touching
    HTML tags themselves (so attributes/highlighted-code spans stay intact).
    """
    if not query:
        return html

    pattern = re.compile(re.escape(query), re.IGNORECASE)
    parts = re.split(r"(<[^>]+>)", html)  # keep tags as their own segments
    out = []
    for part in parts:
        if part.startswith("<") and part.endswith(">"):
            out.append(part)
        else:
            out.append(pattern.sub(lambda m: f"<mark class=\"hl\">{m.group(0)}</mark>", part))
    return "".join(out)


def create_app():
    from flask import Flask, render_template, request, abort
    import markdown as md
    from pygments.formatters import HtmlFormatter

    app = Flask(__name__, template_folder=os.path.join(BASE_DIR, "templates"),
                static_folder=os.path.join(BASE_DIR, "static"))

    def render_markdown(body):
        return md.markdown(
            body,
            extensions=["fenced_code", "codehilite", "tables", "toc"],
            extension_configs={"codehilite": {"css_class": "codehilite", "linenums": False}},
        )

    def all_tags(notes):
        tags = set()
        for meta, _body in notes:
            tags.update(meta["tags"])
        return sorted(tags)

    @app.route("/")
    def index():
        notes = load_all_notes()
        tag = request.args.get("tag", "").strip()
        query = request.args.get("q", "").strip()

        if tag:
            notes = [(m, b) for m, b in notes if tag in m["tags"]]
        if query:
            q_lower = query.lower()
            notes = [(m, b) for m, b in notes
                     if q_lower in m["title"].lower() or q_lower in b.lower()]

        cards = []
        for meta, body in notes:
            plain = re.sub(r"[#*`_>\-]", "", body)
            snippet = plain.strip().replace("\n", " ")[:160]
            cards.append({"meta": meta, "snippet": snippet})

        return render_template(
            "index.html",
            notes=cards,
            tags=all_tags(load_all_notes()),
            active_tag=tag,
            query=query,
        )

    @app.route("/note/<slug>")
    def note_detail(slug):
        meta, body = find_note_by_slug(slug)
        if meta is None:
            abort(404)
        query = request.args.get("q", "").strip()
        html = render_markdown(body)
        if query:
            html = highlight_text(html, query)
        return render_template("note.html", meta=meta, content=html, query=query)

    @app.route("/pygments.css")
    def pygments_css():
        from flask import Response
        css = HtmlFormatter(style="friendly").get_style_defs(".codehilite")
        return Response(css, mimetype="text/css")

    return app


# --------------------------------------------------------------------------
# Argument parsing
# --------------------------------------------------------------------------

def build_parser():
    parser = argparse.ArgumentParser(
        prog="noteflow.py",
        description="NoteFlow - local Markdown notes with auto-tagging, CLI writes, web reads.",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_new = sub.add_parser("new", help="Create a new note")
    p_new.add_argument("title", help="Title of the note")
    p_new.add_argument("--content", help="Note content as a string")
    p_new.add_argument("--file", help="Path to a file containing the note content")
    p_new.set_defaults(func=cmd_new)

    p_list = sub.add_parser("list", help="List all notes with auto-extracted tags")
    p_list.set_defaults(func=cmd_list)

    p_search = sub.add_parser("search", help="Full-text search across notes")
    p_search.add_argument("query", help="Text to search for")
    p_search.set_defaults(func=cmd_search)

    p_serve = sub.add_parser("serve", help="Start the Flask web UI")
    p_serve.add_argument("--port", type=int, default=5000)
    p_serve.add_argument("--debug", action="store_true")
    p_serve.set_defaults(func=cmd_serve)

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

# Built incrementally - see git history for the development progression.
