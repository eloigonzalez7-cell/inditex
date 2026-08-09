# Backlog (Jira simulation)

Statuses: `Backlog` · `Ready` · `In Progress` · `Done`

Story points use the Fibonacci scale. See [ESTIMATIONS.md](ESTIMATIONS.md).

## Board snapshot

| Status | Items |
|--------|-------|
| Ready | E0–E9 (planned) |
| In Progress | — |
| Done | Planning docs (`v0.0.0-plan`) |

## Epics & stories

### E0 — Bootstrap tooling (5 SP) — Ready

**As a** developer, **I want** Webpack 5 + React + TypeScript from scratch, **so that** the project matches Inditex-style tooling expectations.

Acceptance:

- [ ] `npm start` serves unminified assets
- [ ] `npm run build` emits minified production bundle
- [ ] Clean URL routing shell
- [ ] ESLint + Prettier + Husky + commitlint + git-cliff

### E1 — Data layer (5 SP) — Ready

**As a** user, **I want** podcast data fetched through a proxy and cached 24h, **so that** the app stays fast and respects CORS.

Acceptance:

- [ ] AllOrigins adapter
- [ ] 24h localStorage cache with schema version
- [ ] AbortController on requests
- [ ] Unit tests for cache TTL

### E2 — Home view (8 SP) — Ready

**As a** user, **I want** to browse and filter the top 100 podcasts, **so that** I can find shows quickly.

Acceptance:

- [ ] Render top 100
- [ ] Live filter by title and author
- [ ] Navigate to podcast detail
- [ ] Skeleton while loading

### E3 — Podcast detail (8 SP) — Ready

**As a** user, **I want** podcast metadata and an episode list, **so that** I can pick an episode.

Acceptance:

- [ ] Sidebar with image, title, author, description
- [ ] Episode count + table (title, date, duration)
- [ ] 24h cache per podcast id
- [ ] Navigate to episode detail

### E4 — Episode detail (5 SP) — Ready

**As a** user, **I want** to read the episode description and play audio, **so that** I can listen in-browser.

Acceptance:

- [ ] Shared sidebar with links to podcast
- [ ] Sanitized HTML description
- [ ] Native HTML5 audio player

### E5 — App chrome (3 SP) — Ready

**As a** user, **I want** clear navigation feedback, **so that** I know when a transition is running.

Acceptance:

- [ ] Title links to `/`
- [ ] Top-right loading indicator during client navigations

### E6 — Unit tests (5 SP) — Ready

Expand domain/application/UI unit coverage for critical paths.

### E7 — E2E + smoke (5 SP) — Ready

Playwright happy paths for home → podcast → episode; `npm run smoke` on production build.

### E8 — Release polish (3 SP) — Ready

CI workflow, coverage badge, final README, `v1.0.0` tag.

### E9 — UX / performance extras (3 SP) — Ready

Skeletons, route-level code splitting, ADR completion.

## Suggested GitHub labels

`epic`, `story`, `sp-1`, `sp-2`, `sp-3`, `sp-5`, `sp-8`, `phase-0` … `phase-8`
