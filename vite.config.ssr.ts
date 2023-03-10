import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: { port: 4200, host: 'localhost' },
  publicDir: resolve(__dirname, 'client', 'public'),
  plugins: [react()],
  root: resolve(__dirname, 'client'),
  build: {
    minify: true,
    emptyOutDir: false,
    ssr: resolve(__dirname, 'client', 'src', 'entry-server.tsx'),
    outDir: resolve(__dirname, 'dist', 'client'),
  },
  legacy: { buildSsrCjsExternalHeuristics: true },
});
