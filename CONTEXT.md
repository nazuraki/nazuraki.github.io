# nazuraki.github.io

Personal GitHub Pages site — user portfolio and public repo showcase.

## Tech Stack
- **Astro 4** — static site generator, `output: 'static'`
- **Tailwind CSS** — with custom design tokens from The Kinetic Ledger design system
- **TypeScript** — strict mode

## Design System: "The Technical Archivist"
- Spec: `~/Downloads/stitch/the_kinetic_ledger/DESIGN.md`
- Stitch mockups: `~/Downloads/stitch/` (screen.png + code.html per page)
- Dark slate palette, Space Grotesk (headlines) + Inter (body), Material Symbols icons
- No 1px borders — tonal surface shifts only. Max border-radius 8px.
- Primary gradient: 135deg `#cebdff` → `#4c3e76`

## Pages
| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Repo showcase — fetches GitHub API at build time |
| `/projects/[repo]` | `src/pages/projects/[repo].astro` | Repo detail — stars, langs, clone cmd, screenshot |
| `/about` | `src/pages/about.astro` | Profile — edit content directly |
| `/experience` | `src/pages/experience.astro` | Placeholder — populate manually |
| `/contact` | `src/pages/contact.astro` | Contact form — needs FORMSPREE_ENDPOINT env var |

## GitHub API
- `src/lib/github.ts` — all fetch helpers
- Fetches at build time, non-authenticated (public repos)
- Set `GH_TOKEN` env var for higher rate limits (5000/hr vs 60/hr)
- Excludes forks. Sorted by stars descending on index.

## Repo Screenshots
- Drop `public/screenshots/{repo-name}.png` to show a screenshot on the index featured card and detail page.
- Missing screenshots show a placeholder icon — no action needed.

## Deploy
- GitHub Actions: `.github/workflows/deploy.yml`
- Triggers on push to `main`
- Uses `secrets.GITHUB_TOKEN` for API auth during build
- Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions

## Environment Variables
| Var | Required | Purpose |
|---|---|---|
| `GH_TOKEN` | No | GitHub PAT for higher API rate limit |
| `FORMSPREE_ENDPOINT` | No | Formspree form action URL for contact page |

## To-do (user actions)
- [ ] Enable GitHub Pages in repo settings (Source: GitHub Actions)
- [ ] Add screenshots to `public/screenshots/{repo}.png` for app repos
- [ ] Update `src/pages/about.astro` with real bio, skills, photo
- [ ] Update `src/pages/experience.astro` with work history
- [ ] Update `src/pages/contact.astro` with real email + set FORMSPREE_ENDPOINT
- [ ] Update `src/components/Footer.astro` with real article/terminal links
