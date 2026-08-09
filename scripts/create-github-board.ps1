# Creates labels and issues for the Inditex podcast backlog (Jira simulation).
# Prerequisites: gh auth login

$ErrorActionPreference = "Stop"
$repo = "eloigonzalez7-cell/inditex"

function Ensure-Label {
  param($name, $color, $description)
  gh label create $name --repo $repo --color $color --description $description 2>$null
  if ($LASTEXITCODE -ne 0) {
    gh label edit $name --repo $repo --color $color --description $description 2>$null | Out-Null
  }
}

Write-Host "Creating labels..."
Ensure-Label "epic" "6f42c1" "Epic"
Ensure-Label "story" "0e8a16" "User story"
Ensure-Label "sp-3" "c2e0c6" "3 story points"
Ensure-Label "sp-5" "bfdadc" "5 story points"
Ensure-Label "sp-8" "fef2c0" "8 story points"
Ensure-Label "done" "0e8a16" "Completed"
1..8 | ForEach-Object { Ensure-Label "phase-$_" "d4c5f9" "Delivery phase $_" }

$issues = @(
  @{
    title = "E0 - Bootstrap Webpack + React + TypeScript"
    labels = "epic,story,sp-5,phase-1,done"
    body = @"
## Story
As a developer, I want Webpack 5 + React + TypeScript from scratch.

## Acceptance
- [x] npm start serves unminified assets
- [x] npm run build emits minified production bundle
- [x] Clean URL routing shell
- [x] ESLint + Prettier + Husky + commitlint + git-cliff

**Estimate:** 5 SP
"@
  },
  @{
    title = "E1 - Data layer (AllOrigins + 24h cache)"
    labels = "epic,story,sp-5,phase-2,done"
    body = @"
## Story
As a user, I want podcast data fetched through a proxy and cached 24h.

## Acceptance
- [x] AllOrigins adapter
- [x] 24h localStorage cache with schema version
- [x] AbortController on requests
- [x] Unit tests for cache TTL

**Estimate:** 5 SP
"@
  },
  @{
    title = "E2 - Home view (top 100 + live filter)"
    labels = "epic,story,sp-8,phase-3,done"
    body = @"
## Story
As a user, I want to browse and filter the top 100 podcasts.

## Acceptance
- [x] Render top 100
- [x] Live filter by title and author
- [x] Navigate to podcast detail
- [x] Skeleton while loading

**Estimate:** 8 SP
"@
  },
  @{
    title = "E3 - Podcast detail"
    labels = "epic,story,sp-8,phase-4,done"
    body = @"
## Story
As a user, I want podcast metadata and an episode list.

## Acceptance
- [x] Sidebar with image, title, author, description
- [x] Episode count + table
- [x] 24h cache per podcast id
- [x] Navigate to episode detail

**Estimate:** 8 SP
"@
  },
  @{
    title = "E4 - Episode detail (audio + DOMPurify)"
    labels = "epic,story,sp-5,phase-5,done"
    body = @"
## Story
As a user, I want to read the episode description and play audio.

## Acceptance
- [x] Shared sidebar with links to podcast
- [x] Sanitized HTML description
- [x] Native HTML5 audio player

**Estimate:** 5 SP
"@
  },
  @{
    title = "E5 - App chrome (header + loading)"
    labels = "epic,story,sp-3,phase-6,done"
    body = @"
## Story
As a user, I want clear navigation feedback.

## Acceptance
- [x] Title links to home
- [x] Top-right loading indicator during client navigations

**Estimate:** 3 SP
"@
  },
  @{
    title = "E6 - Unit tests"
    labels = "epic,story,sp-5,phase-7,done"
    body = @"
## Acceptance
- [x] Cache TTL tests
- [x] FilterPodcasts tests
- [x] iTunes mapper tests

**Estimate:** 5 SP
"@
  },
  @{
    title = "E7 - E2E + smoke"
    labels = "epic,story,sp-5,phase-7,done"
    body = @"
## Acceptance
- [x] Playwright happy path home to podcast to episode
- [x] npm run smoke on production build

**Estimate:** 5 SP
"@
  },
  @{
    title = "E8 - CI + release polish"
    labels = "epic,story,sp-3,phase-8,done"
    body = @"
## Acceptance
- [x] GitHub Actions CI
- [x] Coverage report
- [x] Final README + v1.0.0 tag

**Estimate:** 3 SP
"@
  },
  @{
    title = "E9 - Skeletons + code splitting"
    labels = "epic,story,sp-3,phase-7,done"
    body = @"
## Acceptance
- [x] Skeleton loaders
- [x] Route-level React.lazy code splitting
- [x] ADRs documented

**Estimate:** 3 SP
"@
  }
)

Write-Host "Creating issues..."
foreach ($issue in $issues) {
  $url = gh issue create --repo $repo --title $issue.title --label $issue.labels --body $issue.body
  Write-Host $url
}

Write-Host "Done. Open: https://github.com/$repo/issues"
