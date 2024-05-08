---
title: Flask Routing Basics
slug: flask-routing-basics
created: 2026-09-15T20:16:28
tags: Python, Web-Dev
---

# Flask Routing Basics

Flask uses decorators to map a URL route to a view function. Jinja2 is
the templating engine used to render HTML from templates.

```python
from flask import Flask

app = Flask(__name__)

@app.route("/api/notes")
def notes():
    return {"notes": []}
```

Each route can also accept dynamic segments like `/note/<slug>`, and you
can pass data into a Jinja2 template with `render_template(...)`.
