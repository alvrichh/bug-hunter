#!/usr/bin/env bash
# Brings this repository in step with the game's source in the portfolio (MyPersonalWeb/bug-hunter/), which is
# where Bug Hunter is edited for now. Usage: scripts/sync-from-portfolio.sh [path to the MyPersonalWeb checkout]
# Copies the game's code, art, docs, changelog and gameplay tests; keeps what is this site's own (index.html,
# src/boot.ts, lib/, public/, build/assets.mjs, render.yaml, the workflow and package files).
set -euo pipefail
SRC="${1:-../MyPersonalWeb}/bug-hunter"
HERE="$(cd "$(dirname "$0")/.." && pwd)"
[ -f "$SRC/src/main.ts" ] || { echo "No game source at $SRC" >&2; exit 1; }
# Each folder is replaced whole, so files removed there are removed here too (no rsync needed).
mirror() { rm -rf "$HERE/$1"; cp -R "$SRC/$1" "$HERE/$1"; }
mirror src
mirror assets
mirror docs
cp "$SRC/CHANGELOG.md" "$HERE/CHANGELOG.md"
cp "$SRC/build/asset-paths.mjs" "$HERE/build/asset-paths.mjs"
for t in siege.test.mjs siege-legacy.test.mjs skins.test.mjs; do
  sed "s|'bug-hunter/|'|g; s|\`bug-hunter/|\`|g" "$SRC/tests/$t" > "$HERE/tests/$t"
done
for s in check-regressions.mjs check-shop.mjs; do
  sed "s|node bug-hunter/scripts|node scripts|g; s|new URL('../../', import.meta.url)|new URL('../', import.meta.url)|; s|dist/game.html|dist/index.html|g; s|}game.html\`|}index.html\`|" "$SRC/scripts/$s" > "$HERE/scripts/$s"
done
echo "Synced from $SRC. Now: npm run typecheck && npm test && npm run build, then commit and push."
