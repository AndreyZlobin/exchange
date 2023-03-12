import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { fs: { allow: ['..'] } },
  publicDir: resolve(__dirname, 'client', 'public'),
  root: resolve(__dirname, 'client'),
  plugins: [react()],
  build: { minify: true, emptyOutDir: false },
  ssr: { format: 'cjs' },
  legacy: { buildSsrCjsExternalHeuristics: true },
});
