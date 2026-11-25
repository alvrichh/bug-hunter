# AGENTS.md — BUG HUNTER

Public repository of the browser game BUG HUNTER. Never add private or job-search information.

- Read [README.md](./README.md), [docs/assets.md](./docs/assets.md) and [CHANGELOG.md](./CHANGELOG.md) before structural or asset work.
- Source: `src/` (game), `lib/storage.ts` (storage that never throws), `index.html` (the page; entry `src/boot.ts`), `public/` (legal pages, ads.txt), `assets/` (art, organised by world).
- Art is published at its stable URLs `/images/game/...` by `build/assets.mjs` + `build/asset-paths.mjs`. Do not rewrite those URLs or move assets without updating the projection.
- Save keys (`bugHunter…`) must never change: they are the players' progress.
- For game behaviour, features or fixes, bump `src/version.ts` and add a `CHANGELOG.md` entry together; keep older entries.
- Run `npm run typecheck`, `npm test` and `npm run build` before pushing; report results accurately.
- `docs/structure.md` and `docs/legacy-repository-guide.md` describe the old layout inside the portfolio (`bug-hunter/` there is the root here).

## Keeping the three repositories in step

- **Bug Hunter's source is the portfolio's `bug-hunter/`** (https://github.com/alvrichh/MyPersonalWeb) for now: edit the game there. This repository is its own site (https://bug-hunter-game.onrender.com) and is brought in step with `scripts/sync-from-portfolio.sh ../MyPersonalWeb` (code, art, docs, changelog, gameplay tests), then typecheck, test, build, commit and push. Never edit `src/` here alone: the next sync would drop it.
- Files that are this site's own and are not synced: `index.html`, `lib/`, `public/`, `build/assets.mjs`, `render.yaml`, `.github/`, `package*.json`, `scripts/sync-from-portfolio.sh`.
- **The Siege is also Cartoon Siege** (https://github.com/alvrichh/cartoon-siege): any change to `src/siege/` or the Siege's sounds in `src/audio.ts` is made in Cartoon Siege too (same code, its own save keys `cartoonSiege.*`, its own strings and version), unless the owner says it is for one game only.
