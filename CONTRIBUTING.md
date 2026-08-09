# Contributing

This repository is a technical-challenge submission, but it follows the same contribution habits used on production teams.

## Workflow

1. Pick a story from [docs/BACKLOG.md](docs/BACKLOG.md).
2. Keep changes small and focused.
3. Stage files in Cursor Source Control.
4. Use **Generate commit message** (Cursor Pro) following [docs/COMMIT_GUIDE.md](docs/COMMIT_GUIDE.md).
5. Ensure commitlint passes (Husky `commit-msg` hook).
6. `CHANGELOG.md` is regenerated automatically after commits (git-cliff).
7. Update story status in the backlog when done.

## Code standards

- TypeScript strict mode
- Hexagonal boundaries: UI must not call iTunes URLs directly
- Native CSS only (no UI/CSS frameworks)
- Unit tests for domain and application use cases
- E2E coverage for critical user journeys

## Definition of Done

See [docs/DEFINITION_OF_DONE.md](docs/DEFINITION_OF_DONE.md).
