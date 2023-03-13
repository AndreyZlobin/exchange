import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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
