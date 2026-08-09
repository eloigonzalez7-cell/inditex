# Inditex Podcast Player

[![CI](https://github.com/OWNER/inditex-podcast-player/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/inditex-podcast-player/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/badge/coverage-unit%20tests-informational)](./coverage/lcov-report/index.html)

Single-page application to browse Apple's top music podcasts, inspect podcast details, and play episodes. Built for the Inditex frontend technical challenge.

## Requirements

- **Node.js** `>= 22`
- **npm** `>= 10`
- Latest **Google Chrome** (desktop) — review target

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:3000`.

### Production mode

```bash
npm run build
npm run preview
```

- **Development** (`npm start`): Webpack serves assets **without** minification.
- **Production** (`npm run build`): assets are **concatenated and minified** under `dist/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server (port 3000, history API fallback) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` on port 4173 |
| `npm test` | Unit tests (Vitest) |
| `npm run test:coverage` | Unit tests + coverage report |
| `npm run test:e2e` | Playwright e2e (starts preview via webServer) |
| `npm run smoke` | Production build + critical e2e smoke |
| `npm run lint` | ESLint |
| `npm run changelog` | Regenerate `CHANGELOG.md` with git-cliff |

## Features

- Home `/` — top 100 podcasts, live filter (title + author), 24h cache
- Podcast `/podcast/:podcastId` — sidebar + episode list, 24h cache
- Episode `/podcast/:podcastId/episode/:episodeId` — sanitized HTML + HTML5 audio
- Header title → home; top-right loading indicator during fetches
- Clean URLs (no hash routing)
- CORS via AllOrigins (infrastructure layer only)

## Architecture

Feature-oriented **hexagonal** layout:

```text
src/features/podcasts/
  domain/           # Podcast, Episode, ports
  application/      # use cases
  infrastructure/   # iTunes + AllOrigins + cache
  ui/               # React pages
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/DECISIONS.md](docs/DECISIONS.md).

## Engineering bar

- DOMPurify for episode HTML
- AbortController on route data loads
- Skeleton loaders
- Route-level code splitting (`React.lazy`)
- Husky + commitlint + git-cliff changelog
- GitHub Actions CI + Playwright smoke

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/SETUP.md](docs/SETUP.md) | Git, Node, Cursor, GitHub |
| [docs/BRIEF.md](docs/BRIEF.md) | Challenge brief |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Traceability matrix |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Simulated Jira backlog |
| [docs/ESTIMATIONS.md](docs/ESTIMATIONS.md) | Story points |
| [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md) | Milestones |
| [docs/COMMIT_GUIDE.md](docs/COMMIT_GUIDE.md) | Conventional Commits + Cursor Pro |
| [CHANGELOG.md](CHANGELOG.md) | Generated changelog |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [SECURITY.md](SECURITY.md) | HTML sanitization |

## Milestone tags

`v0.0.0-plan` → `v0.1.0-foundation` → `v0.2.0-data-layer` → `v0.3.0-home` → `v0.4.0-podcast-detail` → `v0.5.0-episode` → `v0.6.0-chrome` → `v0.7.0-tests` → `v1.0.0`

## GitHub badge note

Replace `OWNER` in the CI badge URL with your GitHub username/org after creating the remote repository.

## License

Private technical challenge submission. Not licensed for redistribution.
