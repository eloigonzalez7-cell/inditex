# Product brief

English summary of the Inditex frontend technical challenge.

## Goal

Build a mini SPA to browse and listen to music podcasts with exactly three views:

1. **Home** (`/`) — top 100 podcasts, client filter, 24h cache
2. **Podcast detail** (`/podcast/:podcastId`) — sidebar + episode list, 24h cache
3. **Episode detail** (`/podcast/:podcastId/episode/:episodeId`) — sidebar + HTML description + HTML5 audio

## Constraints

- Client-side routing only (SPA); clean URLs (no hash router)
- Development mode: assets served without minification
- Production mode: concatenated and minified assets
- Public repository with incremental commits and milestone tags
- README must explain how to run both modes
- ES2020+ allowed; Webpack or Parcel allowed
- Reviewed only on latest desktop Chrome
- Errors: log to console (message + stack); no user-facing error UI required
- Do not use AngularJS or Ember

## External resources

- Top podcasts: `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
- Podcast lookup: `https://itunes.apple.com/lookup?id={id}&media=podcast&entity=podcastEpisode&limit=20`
- CORS proxy: `https://allorigins.win`

## Header behaviour

- App title links to home
- Show a visual loading indicator in the top-right during client-side navigations; hide when the transition completes
