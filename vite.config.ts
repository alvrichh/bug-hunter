import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
// @ts-expect-error plain ES module
import { preparePublic } from './build/assets.mjs';

const root = import.meta.dirname;
const commit = (() => {
  if (process.env.RENDER_GIT_COMMIT) return process.env.RENDER_GIT_COMMIT.slice(0, 7);
  try { return execSync('git rev-parse --short HEAD', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return 'dev'; }
})();

export default defineConfig(() => ({
  base: './',
  publicDir: preparePublic(root),
  define: { __GAME_BUILD__: JSON.stringify({ commit, built: new Date().toISOString().slice(0, 10) }) },
  build: { target: 'es2022', outDir: 'dist', emptyOutDir: true, rollupOptions: { input: { index: 'index.html' } } },
}));
