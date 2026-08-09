# ADR 0001 — Use Webpack 5

## Status

Accepted

## Context

The challenge allows Webpack or Parcel and explicitly asks for distinct development (unminified) and production (minified, concatenated) modes. Inditex frontend teams historically lean on Webpack. Scaffolding with CRA/Vite would hide bundler decisions reviewers want to see.

## Decision

Configure **Webpack 5** from scratch with TypeScript and React:

- `development`: source maps, no minify
- `production`: minification + concatenated bundles
- `webpack-dev-server` with history API fallback for clean URLs

## Consequences

- More boilerplate than Vite, but demonstrates bundler literacy
- Dual-mode scripts map cleanly to README requirements
- Route-level code splitting uses Webpack `splitChunks` / dynamic `import()`
