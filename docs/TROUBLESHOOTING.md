# Troubleshooting

## Homepage shows 0 podcasts

Apple iTunes feeds do not send CORS headers. The HTTP client (`src/shared/http/fetchJson.ts`) tries strategies in order:

1. **Development only:** Webpack dev-server proxy (`/itunes-proxy` → `itunes.apple.com`) — most reliable locally
2. AllOrigins `get` endpoint
3. AllOrigins `raw` endpoint (as required by the challenge brief)
4. `corsproxy.io` as last-resort fallback

If the homepage is empty:

1. Stop the dev server and run `npm start` again (proxy config needs a restart)
2. Hard-refresh the browser (`Ctrl+Shift+R`)
3. Clear site data for `localhost:3000` if an old cache entry remains
4. Check the browser console for which proxy strategies failed
