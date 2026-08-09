# ADR 0003 — Commit and changelog automation

## Status

Accepted

## Context

The challenge asks for incremental public commits and tags. Manual changelogs drift. External LLM APIs are unavailable; Cursor Pro can draft commit messages in the IDE.

## Decision

1. **Commit messages** — authored in Cursor (Generate commit message) using Conventional Commits in English.
2. **commitlint** + Husky `commit-msg` — enforce format.
3. **git-cliff** — regenerate `CHANGELOG.md` from git history (post-commit / `npm run changelog`).
4. No third-party commit-message API keys.

## Consequences

- Changelog is derived from history, not hand-edited prose
- Post-commit amend of `CHANGELOG.md` only when the commit is still local
- Contributors must follow Conventional Commits or hooks fail
