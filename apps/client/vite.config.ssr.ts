import { resolve } from 'path';
import { defineConfig } from 'vite';

import { alias } from './vite/aliases';

export default defineConfig({
  resolve: {
    alias: alias.map(({ find, replacement }) => ({
      find,
      replacement: resolve(__dirname, replacement),
    })),
  },
  build: {
    minify: true,
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src', 'entry-server.tsx'),
      output: {
        format: 'commonjs',
      },
    },
    commonjsOptions: { include: ['@astral/components'] },
    ssr: true,
    outDir: resolve(__dirname, 'dist', 'client'),
  },
  // legacy: { buildSsrCjsExternalHeuristics: true },
});
