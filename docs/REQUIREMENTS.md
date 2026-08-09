# Requirements traceability

Maps the PDF challenge requirements to backlog items.

| Requirement | Story | Notes |
|-------------|-------|-------|
| SPA with client-side navigation | E0, E5 | React Router BrowserRouter |
| Dev unminified / prod minified | E0 | Webpack modes |
| Public repo + incremental commits + tags | E8 | Milestone tags |
| README for both modes | E8 | README.md |
| Clean URLs (no hash) | E0 | history API |
| Home top 100 podcasts | E2 | Apple RSS |
| Cache list 24h | E1, E2 | localStorage TTL |
| Live filter title + author | E2 | FilterPodcasts use case |
| Navigate to podcast detail | E2, E3 | `/podcast/:id` |
| Podcast sidebar (image, title, author, description) | E3 | shared sidebar |
| Episode count + list (title, date, duration) | E3 | |
| Cache podcast detail 24h | E1, E3 | |
| Navigate to episode | E3, E4 | |
| Episode sidebar links back to podcast | E4, E5 | |
| Episode title, HTML description, audio | E4 | DOMPurify |
| Header title → home | E5 | |
| Loading indicator top-right on navigation | E5 | |
| AllOrigins for CORS | E1 | infrastructure only |
| Console-only errors | all | no toast UI |
| Unit + e2e tests | E6, E7 | Vitest + Playwright |
