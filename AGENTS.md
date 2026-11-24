# AGENTS.md — BUG HUNTER

Public repository of the browser game BUG HUNTER. Never add private or job-search information.

- Read [README.md](./README.md), [docs/assets.md](./docs/assets.md) and [CHANGELOG.md](./CHANGELOG.md) before structural or asset work.
- Source: `src/` (game), `lib/storage.ts` (storage that never throws), `index.html` (the page; entry `src/boot.ts`), `public/` (legal pages, ads.txt), `assets/` (art, organised by world).
- Art is published at its stable URLs `/images/game/...` by `build/assets.mjs` + `build/asset-paths.mjs`. Do not rewrite those URLs or move assets without updating the projection.
- Save keys (`bugHunter…`) must never change: they are the players' progress.
- For game behaviour, features or fixes, bump `src/version.ts` and add a `CHANGELOG.md` entry together; keep older entries.
- Run `npm run typecheck`, `npm test` and `npm run build` before pushing; report results accurately.
- `docs/structure.md` and `docs/legacy-repository-guide.md` describe the old layout inside the portfolio (`bug-hunter/` there is the root here).
