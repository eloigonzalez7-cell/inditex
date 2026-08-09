# Sprint / milestone plan

Work proceeds in tagged milestones so reviewers can follow evolution.

| Phase | Tag | Focus | Stories |
|-------|-----|-------|---------|
| 0 | `v0.0.0-plan` | Docs, backlog, ADRs, Cursor rules | Planning |
| 1 | `v0.1.0-foundation` | Webpack, React shell, DX hooks | E0 |
| 2 | `v0.2.0-data-layer` | Ports, iTunes, cache, AbortController | E1 |
| 3 | `v0.3.0-home` | Top 100 + filter + skeleton | E2, E9 (partial) |
| 4 | `v0.4.0-podcast-detail` | Sidebar + episodes | E3 |
| 5 | `v0.5.0-episode` | Audio + DOMPurify | E4 |
| 6 | `v0.6.0-chrome` | Header + loading indicator | E5 |
| 7 | `v0.7.0-tests` | Unit expansion + Playwright + splitting | E6, E7, E9 |
| 8 | `v1.0.0` | CI, smoke, README final | E8 |

## Cadence guideline

Prefer **stopping between phases** (or at least between tags) so the git history looks incremental rather than a single burst. Within a phase, prefer many small Conventional Commits over one large commit.
