# Architecture

## Overview

The UI is a React SPA. Business rules and I/O sit behind ports so views stay thin and testable.

```text
src/
  app/                      # shell: router, layout, navigation loading
  shared/                   # http client, storage, dates, skeleton, CSS tokens
  features/
    podcasts/
      domain/               # Podcast, Episode, ports
      application/          # use cases
      infrastructure/       # iTunes + AllOrigins + localStorage cache
      ui/                   # pages, components, hooks
```

## Dependency rule

`ui` → `application` → `domain` ← `infrastructure`

Infrastructure implements domain ports. React never imports Apple URLs.

## Data flow

1. Page mounts and calls a use case (e.g. `GetTopPodcasts`).
2. Use case asks `PodcastRepository` (port).
3. Cached decorator checks localStorage TTL (24h).
4. On miss, `ItunesPodcastRepository` fetches via AllOrigins, maps DTO → domain.
5. Result returns to UI; errors `console.error` with stack.

## Routing

| Path | Page |
|------|------|
| `/` | Home |
| `/podcast/:podcastId` | Podcast detail |
| `/podcast/:podcastId/episode/:episodeId` | Episode detail |

Browser history API only (no hash).

## Caching

See [adr/0005-caching.md](adr/0005-caching.md). Keys are versioned to allow schema migrations.
