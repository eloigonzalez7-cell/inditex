# Inditex Podcast Player

Single-page application that lets you browse Apple's top music podcasts, inspect podcast details, and play individual episodes.

> Status: planning complete (`v0.0.0-plan`). Application code lands in later milestones.

## Requirements

- **Node.js** `>= 22`
- **npm** `>= 10`
- Latest **Google Chrome** (desktop) — the only browser under review

## Scripts (target)

| Command | Description |
|---------|-------------|
| `npm start` | Development server (unminified assets) |
| `npm run build` | Production build (concatenated + minified) |
| `npm run preview` | Serve the production `dist/` folder |
| `npm test` | Unit tests (Vitest) |
| `npm run test:coverage` | Unit tests with coverage |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run smoke` | Production build + one critical e2e |
| `npm run lint` | ESLint |
| `npm run changelog` | Regenerate `CHANGELOG.md` via git-cliff |

## Architecture

Feature-oriented **hexagonal** layout under `src/features/podcasts` (`domain` / `application` / `infrastructure` / `ui`). See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/SETUP.md](docs/SETUP.md) | Machine setup (Git, Node, Cursor, GitHub) |
| [docs/BRIEF.md](docs/BRIEF.md) | Product brief from the technical challenge |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Requirement → story traceability |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Simulated Jira backlog |
| [docs/ESTIMATIONS.md](docs/ESTIMATIONS.md) | Story-point rationale |
| [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md) | Milestone plan |
| [docs/DEFINITION_OF_DONE.md](docs/DEFINITION_OF_DONE.md) | Definition of Done |
| [docs/COMMIT_GUIDE.md](docs/COMMIT_GUIDE.md) | Conventional Commits + Cursor Pro |
| [docs/DECISIONS.md](docs/DECISIONS.md) | ADR index |
| [CHANGELOG.md](CHANGELOG.md) | Generated changelog |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [SECURITY.md](SECURITY.md) | HTML sanitization notes |

## Milestones

Tagged releases track evolution for reviewers:

- `v0.0.0-plan` — documentation & backlog
- `v0.1.0-foundation` — Webpack + React shell
- `v0.2.0-data-layer` — iTunes + cache
- `v0.3.0-home` … `v1.0.0` — features through release

## License

Private technical challenge submission. Not licensed for redistribution.
