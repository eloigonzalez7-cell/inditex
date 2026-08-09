# Commit guide

## Format

```text
type(scope): subject

[optional body]

[optional footer]
```

Examples:

```text
feat(podcasts): add 24h local storage cache

Refs E1
```

```text
test(cache): cover TTL expiry with mocked clock
```

```text
docs: add architecture decision records
```

## Types

`feat` · `fix` · `docs` · `test` · `refactor` · `chore` · `perf` · `ci` · `build`

## Using Cursor Pro

1. Stage related files only (one intent per commit).
2. Open Source Control.
3. Use **Generate commit message**.
4. Ensure the message matches Conventional Commits (English).
5. Commit — Husky runs commitlint; git-cliff refreshes `CHANGELOG.md`.

## Scopes (suggested)

`podcasts` · `home` · `episode` · `cache` · `app` · `ci` · `deps`
