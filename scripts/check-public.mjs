// After the build: every asset is published byte for byte at its stable /images/game/... URL.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gameAssetEntries } from '../build/asset-paths.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const assets = gameAssetEntries(join(root, 'assets'));
const files = (dir, prefix = '') => readdirSync(dir, { withFileTypes: true }).flatMap(e => { const p = prefix ? `${prefix}/${e.name}` : e.name; return e.isDirectory() ? files(join(dir, e.name), p) : [p]; });
const page = join(root, 'dist', 'index.html');
assert.ok(existsSync(page), 'Missing dist/index.html');
assert.ok(!readFileSync(page, 'utf8').includes('/src/main.ts'), 'The page entry was not bundled.');
const out = join(root, 'dist', 'images', 'game');
assert.deepEqual(files(out).sort(), assets.map(e => e.path).sort(), 'Unexpected or missing asset URLs');
for (const a of assets) assert.ok(readFileSync(a.source).equals(readFileSync(join(out, a.path))), `Changed asset bytes: ${a.path}`);
console.log(`Verified dist/index.html and ${assets.length} byte-identical assets at their public URLs.`);
