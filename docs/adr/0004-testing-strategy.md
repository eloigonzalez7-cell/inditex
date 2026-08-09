# ADR 0004 — Testing strategy

## Status

Accepted

## Context

Suggestions call for unit tests and e2e. Domain rules (filter, TTL cache) must be proven without flaky network calls. Production artefacts should be smoke-tested.

## Decision

- **Vitest + Testing Library** — unit/component tests; fake repositories and mocked clocks for TTL
- **Playwright** — e2e happy paths with fixtures / route mocking
- **`npm run smoke`** — `build` → static server on `dist` → one critical e2e
- Coverage reported in CI; badge on README after Phase 8

## Consequences

- Fast feedback on business rules
- E2E does not depend on live Apple/AllOrigins availability in CI
- Additional tooling in `package.json` and CI minutes
