"""WSGI entry point for hosting NoteFlow's web reader (e.g. on Vercel)."""
from noteflow import create_app

app = create_app()
