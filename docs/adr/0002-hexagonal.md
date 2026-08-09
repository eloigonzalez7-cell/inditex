# ADR 0002 — Hexagonal feature modules on the frontend

## Status

Accepted

## Context

Reviewers value clear separation of domain concepts, services, and screens. A flat `components/` folder tends to mix HTTP, mapping, and JSX.

## Decision

Organize the podcasts capability as a hexagonal feature:

- **domain** — entities and ports
- **application** — use cases (`GetTopPodcasts`, `FilterPodcasts`, …)
- **infrastructure** — iTunes, AllOrigins, cache
- **ui** — React pages and presentational components

## Consequences

- Use cases are unit-testable without DOM or network
- Swapping the HTTP proxy or cache store does not touch UI
- Slightly more files; documentation must explain the layout
