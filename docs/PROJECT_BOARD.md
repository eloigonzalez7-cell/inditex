# Project board (Jira simulation)

Live board: https://github.com/users/eloigonzalez7-cell/projects/1

Issues: https://github.com/eloigonzalez7-cell/inditex/issues

Kanban snapshot for https://github.com/eloigonzalez7-cell/inditex

Statuses mirror a classic delivery board. Story points live in [ESTIMATIONS.md](ESTIMATIONS.md).

## Board

| Backlog | Ready | In Progress | Done |
|---------|-------|-------------|------|
| | | | **E0** Bootstrap Webpack+TS+React (5 SP) |
| | | | **E1** Data layer + 24h cache (5 SP) |
| | | | **E2** Home view + filter (8 SP) |
| | | | **E3** Podcast detail (8 SP) |
| | | | **E4** Episode detail + DOMPurify (5 SP) |
| | | | **E5** Header + loading indicator (3 SP) |
| | | | **E6** Unit tests (5 SP) |
| | | | **E7** E2E + smoke (5 SP) |
| | | | **E8** CI + README polish (3 SP) |
| | | | **E9** Skeletons + code splitting (3 SP) |
| | | | **UI polish** Match challenge mockup |

## Labels to create on GitHub

| Label | Color | Use |
|-------|-------|-----|
| `epic` | `#6f42c1` | Epic container |
| `story` | `#0e8a16` | User story |
| `sp-3` | `#c2e0c6` | 3 story points |
| `sp-5` | `#bfdadc` | 5 story points |
| `sp-8` | `#fef2c0` | 8 story points |
| `phase-0` … `phase-8` | `#d4c5f9` | Delivery phase |
| `done` | `#0e8a16` | Completed |

## Sync script

After `gh auth login`, from the repo root:

```powershell
powershell -File scripts/create-github-board.ps1
```

This creates labels + one GitHub Issue per epic with acceptance criteria.
