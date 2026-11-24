/* The art is organised by world in assets/ (see docs/assets.md) but published at its old, stable URLs under
   /images/game/... (`asset-paths.mjs`). Before Vite runs, every asset is copied to its public URL in a disposable
   folder (.cache/public), together with public/, and that folder is Vite's public directory. */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { gameAssetEntries } from './asset-paths.mjs';

export function preparePublic(root) {
  root = resolve(root);
  const out = join(root, '.cache', 'public');
  const entries = gameAssetEntries(join(root, 'assets'));
  if (!entries.some(e => e.path === 'ui/logo.webp')) throw new Error('Missing asset: ui/logo.webp');
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), out, { recursive: true });
  for (const e of entries) { const target = join(out, 'images', 'game', e.path); mkdirSync(dirname(target), { recursive: true }); cpSync(e.source, target); }
  return out;
}
