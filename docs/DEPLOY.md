# Deploying NoteFlow

> **Live:** [noteflow.akshatgcodes.in](https://noteflow.akshatgcodes.in) · **Host:** Vercel · **Auto-deploy:** on push to `master`

For local development, see [SETUP.md](SETUP.md).

---

## 1. Architecture in production

| Piece | Runs on | Notes |
|---|---|---|
| Landing page | Vercel (static) | `landing/` built with `@vercel/static-build`, served at `/` |
| Web reader | Vercel (Python function) | `index.py` (`create_app()`) through `@vercel/python`; handles `/notes`, `/note/*`, `/pygments.css` |
| Notes | Function bundle | The committed `notes/` folder, read-only |
| DNS | GoDaddy | `noteflow.akshatgcodes.in` → CNAME to Vercel |

---

## 2. Environment variables

None.

---

## 3. First-time deploy

1. [vercel.com/new](https://vercel.com/new) → import `akshatgcodes/NoteFlow`
2. Framework preset: **Other** · Root directory: `./` (the repo's `vercel.json` defines the builds)
3. Deploy. Every push to `master` now deploys to production, and every PR gets a preview URL.

To publish a new note: create it locally with `noteflow.py new`, commit the file in `notes/`, and push.

---

## 4. Database migrations

None. Notes are files.

---

## 5. Custom domain

`noteflow.akshatgcodes.in` is set up with the setup toolkit:

```powershell
.\scripts\setup-subdomain.ps1 -Subdomain "noteflow" -Platform Vercel -VercelProject "noteflow"
```

Manual fallback: add the domain in Vercel → Project → Domains, then create a GoDaddy CNAME `noteflow` → the target Vercel shows. HTTPS certificates are issued automatically once DNS resolves (2–10 min).

---

## 6. Verify a deploy

- [ ] `https://noteflow.akshatgcodes.in` loads the landing page
- [ ] `/notes` lists the sample notes with tags in the sidebar
- [ ] Clicking a tag filters the list
- [ ] `/note/docker-basics?q=docker` highlights "docker" in the page, including inside code

---

## 7. Rollback

| Host | How |
|---|---|
| Vercel | Dashboard → Deployments → pick the last good one → **Promote to Production** (or `vercel rollback`) |

After rolling back, note it in a commit or PR so the next push doesn't silently re-ship the broken version.

---

## 8. Monitoring & logs

- **Logs:** Vercel → Project `noteflow` → Logs
- **Errors:** none yet beyond Vercel's function logs
- **Uptime:** none yet
- **Dependencies:** Dependabot opens weekly update PRs and a maintenance report is emailed every week (see `.github/workflows/`)

---

## Known production limitations

- The hosted reader is read-only. Notes change only when a new commit is deployed.
- Vercel prints a warning about the legacy `builds` config on every deploy. It's expected.

---

<div align="center">

<h3>Akshat Gupta</h3>

<a href="https://akshatgcodes.in"><img src="https://img.shields.io/badge/Website-akshatgcodes.in-111111?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
<a href="https://linkedin.com/in/akshatgcodes"><img src="https://img.shields.io/badge/LinkedIn-akshatgcodes-0A66C2?style=flat-square" alt="LinkedIn"></a>
<a href="https://github.com/akshatgcodes"><img src="https://img.shields.io/badge/GitHub-akshatgcodes-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="mailto:akshatgcodes@gmail.com"><img src="https://img.shields.io/badge/Email-akshatgcodes%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>

</div>
