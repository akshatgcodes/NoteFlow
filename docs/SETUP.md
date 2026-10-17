# Local Setup — NoteFlow

> **Just want to try it?** Browse the sample notes at [noteflow.akshatgcodes.in](https://noteflow.akshatgcodes.in). No setup needed.
> This guide is for running NoteFlow locally with your own notes.

---

## Prerequisites

- Python 3.8+
- Node.js 20+, only if you want to build the landing page

---

## 1. Clone and install

```bash
git clone https://github.com/akshatgcodes/NoteFlow
cd NoteFlow
python3 -m venv .venv && source .venv/bin/activate   # optional
pip install -r requirements.txt
```

---

## 2. Environment variables

None. NoteFlow has no configuration beyond `config.json`.

---

## 3. Use the CLI

```bash
# create a note (content from a flag, a file, or stdin ending with Ctrl-D)
python noteflow.py new "Binary Search Notes" --content "Binary search runs in O(log n)..."
python noteflow.py new "My Note" --file my_note_source.md
python noteflow.py new "My Note"

# list every note with its tags
python noteflow.py list

# full-text search
python noteflow.py search "binary search"
```

To add a tag, add a keyword to `config.json`, for example `"kubernetes": "DevOps"`. A value can also be a list of tags.

---

## 4. Run the web reader

```bash
python noteflow.py serve                 # http://localhost:5000
python noteflow.py serve --port 5050 --debug
```

Locally, `/` redirects to the note list at `/notes`, since the landing page is only built at deploy time. To preview the landing page:

```bash
cd landing && npm install && npm run dev   # http://localhost:3000
```

---

## 5. Deploy to production

See [DEPLOY.md](DEPLOY.md) for production deployment, custom domain and rollback steps.

---

## Testing

There's no automated test suite yet. CI checks that every Python file compiles and that the landing page lints and builds. To check a change by hand: create a note containing a configured keyword and confirm `list` shows the tag, then search a word that appears inside a code block and confirm it's highlighted on the note page.

---

## Known local-only limitations

- `/` doesn't show the landing page locally. In production `vercel.json` routes it to the static export.
- `serve` binds to `127.0.0.1` only. Use a reverse proxy or the hosted version to share it.

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
