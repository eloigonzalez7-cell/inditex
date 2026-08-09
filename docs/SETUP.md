# Machine setup

## Required tools

| Tool | Version | Notes |
|------|---------|-------|
| Git | >= 2.40 | [git-scm.com](https://git-scm.com/download/win) |
| Node.js | >= 22 | Includes npm |
| Google Chrome | latest | Review target |
| Cursor | Pro | Commit message generation |

Optional: [GitHub CLI](https://cli.github.com) for creating/pushing the remote.

## Verify installation

```powershell
git --version
node -v
npm -v
```

## Git identity (local or global)

Commits must use the email linked to your GitHub account:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

This repository may already have a **local** `user.name` / `user.email` for bootstrap. Override them with your real GitHub identity before pushing.

## GitHub repository

1. Create an empty **public** repo (no README / .gitignore / license).
2. From this folder:

```powershell
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
git push --tags
```

With GitHub CLI:

```powershell
gh auth login
gh repo create inditex-podcast-player --public --source=. --remote=origin
git push -u origin main
```

## Cursor settings

Recommended user settings (`%APPDATA%\Cursor\User\settings.json`):

- `editor.formatOnSave`: `true`
- `editor.defaultFormatter`: `esbenp.prettier-vscode`
- Workspace TypeScript SDK when `node_modules/typescript` exists

Project rules live in `.cursor/rules/inditex-podcast.mdc`.

## Commit flow

See [COMMIT_GUIDE.md](COMMIT_GUIDE.md).
