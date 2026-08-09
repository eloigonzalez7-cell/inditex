# ADR 0005 — 24-hour localStorage cache

## Status

Accepted

## Context

The brief requires client-side storage of the top podcasts list and podcast detail payloads, refreshing only after more than one day.

## Decision

Implement a versioned `CacheStore` port with a `LocalStorageCacheStore` adapter:

- Store `{ savedAt, payload }` per key
- TTL = `24 * 60 * 60 * 1000` ms
- Separate keys for top list vs `podcast:{id}`
- Schema version prefix to invalidate breaking mapper changes
- Unit tests freeze time to assert hit/miss behaviour

## Consequences

- Fewer upstream calls and faster revisits
- Stale data up to 24h (accepted by the brief)
- Must handle `JSON.parse` failures gracefully (treat as miss + `console.error`)
