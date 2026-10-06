# Contributing to Vault Tasks

## PR-flow discipline (portfolio standard)

1. **All changes to `main` go through a pull request** — opened as a draft first.
   No direct pushes to `main`, ever.
2. The PR must be **green** (tests pass: `npm test`, build passes: `npm run build`) before review.
3. The repo **owner merges**; contributors and automation never merge.
4. Every PR adds its entry under `## [Unreleased]` in `CHANGELOG.md` and **bumps semver**
   (patch = fix/chore, minor = feature, major = breaking change).
5. Merge commits reference the PR number (e.g. `(#123)`).
6. Releases are tagged `vX.Y.Z` after merge.

## Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm test         # run tests (vitest run)
npm run lint     # lint (eslint .)
```

## Versioning

- `package.json` `version` is the single source of truth.
- `scripts/bump-version.mjs` stamps the version across the app (package.json, index.html meta, native shells).
- Release tags must match `package.json` (CI enforces this on `v*` / `apk-v*` tags — see `.github/workflows/android-release.yml`).
