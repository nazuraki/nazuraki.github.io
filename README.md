# nazuraki.github.io
Source for nazuraki.github.io

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro](https://astro.build) v4 (static output) |
| Styling | Tailwind CSS v3 |
| Icons | Material Symbols (Google Fonts) |
| Hosting | GitHub Pages (`nazuraki.github.io`) |
| Data | GitHub REST API (fetched at build time, no runtime server) |

## Key files

| Path | Role |
|------|------|
| `src/lib/github.ts` | GitHub API client — fetches repos, exposes helpers |
| `src/pages/index.astro` | Homepage: featured + secondary repo cards + stats sidebar |
| `src/pages/projects/[repo].astro` | Per-repo detail page |
| `src/layouts/BaseLayout.astro` | Shell: nav, fonts, global styles |
| `public/screenshots/` | Drop `<repo>.png` here to promote a repo to featured |
| `astro.config.mjs` | Astro + Tailwind config, site URL |

## Screenshot convention

To feature a repo with a screenshot:

```
public/screenshots/<exact-repo-name>.png
```

The build checks for this file at `process.cwd()/public/screenshots/<name>.png`. If found, the repo is promoted to the featured section with a 16:9 preview image.

## Development

```
just dev        # start local dev server
just build      # production build → dist/
just preview    # serve dist/ locally
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which runs `astro build` and publishes `dist/` to GitHub Pages.
