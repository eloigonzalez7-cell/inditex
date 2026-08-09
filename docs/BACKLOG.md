# Backlog (Jira simulation)

Statuses: `Backlog` · `Ready` · `In Progress` · `Done`

Story points use the Fibonacci scale. See [ESTIMATIONS.md](ESTIMATIONS.md).

## Board snapshot

| Status | Items |
|--------|-------|
| Done | E0–E9, planning docs |
| In Progress | — |
| Ready | — |

## Epics & stories

### E0 — Bootstrap tooling (5 SP) — Done

**As a** developer, **I want** Webpack 5 + React + TypeScript from scratch, **so that** the project matches Inditex-style tooling expectations.

Acceptance:

- [x] `npm start` serves unminified assets
- [x] `npm run build` emits minified production bundle
- [x] Clean URL routing shell
- [x] ESLint + Prettier + Husky + commitlint + git-cliff

### E1 — Data layer (5 SP) — Done

**As a** user, **I want** podcast data fetched through a proxy and cached 24h, **so that** the app stays fast and respects CORS.

Acceptance:

- [x] AllOrigins adapter
- [x] 24h localStorage cache with schema version
- [x] AbortController on requests
- [x] Unit tests for cache TTL

### E2 — Home view (8 SP) — Done

**As a** user, **I want** to browse and filter the top 100 podcasts, **so that** I can find shows quickly.

Acceptance:

- [x] Render top 100
- [x] Live filter by title and author
- [x] Navigate to podcast detail
- [x] Skeleton while loading

### E3 — Podcast detail (8 SP) — Done

**As a** user, **I want** podcast metadata and an episode list, **so that** I can pick an episode.

Acceptance:

- [x] Sidebar with image, title, author, description
- [x] Episode count + table (title, date, duration)
- [x] 24h cache per podcast id
- [x] Navigate to episode detail

### E4 — Episode detail (5 SP) — Done

**As a** user, **I want** to read the episode description and play audio, **so that** I can listen in-browser.

Acceptance:

- [x] Shared sidebar with links to podcast
- [x] Sanitized HTML description
- [x] Native HTML5 audio player

### E5 — App chrome (3 SP) — Done

**As a** user, **I want** clear navigation feedback, **so that** I know when a transition is running.

Acceptance:

- [x] Title links to `/`
- [x] Top-right loading indicator during client navigations

### E6 — Unit tests (5 SP) — Done

Expand domain/application/UI unit coverage for critical paths.

### E7 — E2E + smoke (5 SP) — Done

Playwright happy paths for home → podcast → episode; `npm run smoke` on production build.

### E8 — Release polish (3 SP) — Done

CI workflow, coverage badge, final README, `v1.0.0` tag.

### E9 — UX / performance extras (3 SP) — Done

Skeletons, route-level code splitting, ADR completion.

## Suggested GitHub labels

`epic`, `story`, `sp-1`, `sp-2`, `sp-3`, `sp-5`, `sp-8`, `phase-0` … `phase-8`
