# Estimations

## Scale

Fibonacci story points. **1 SP ≈ 1–1.5 focused hours** for a single developer familiar with React/TypeScript.

| SP | Meaning |
|----|---------|
| 1 | Trivial wiring or docs tweak |
| 2 | Small isolated change |
| 3 | Half-day feature slice |
| 5 | Full day with tests |
| 8 | Multi-file feature + UI + tests |

## Epic estimates

| ID | Title | SP | Confidence |
|----|-------|-----|------------|
| E0 | Bootstrap | 5 | High |
| E1 | Data layer | 5 | Medium (CORS/proxy variability) |
| E2 | Home | 8 | High |
| E3 | Podcast detail | 8 | Medium (payload shape) |
| E4 | Episode detail | 5 | High |
| E5 | App chrome | 3 | High |
| E6 | Unit tests | 5 | High |
| E7 | E2E + smoke | 5 | Medium |
| E8 | Release polish | 3 | High |
| E9 | Extras | 3 | High |
| **Total** | | **50** | |

## Assumptions

- One developer, Chrome-only target
- Apple API + AllOrigins available during development
- Commit/tag narrative is part of delivery, not overhead to skip
- No design system beyond native CSS matching the brief screenshots

## Risks buffered in estimates

- AllOrigins downtime → mock fixtures for tests
- Inconsistent iTunes episode fields → defensive mappers
- HTML descriptions → DOMPurify integration time in E4
