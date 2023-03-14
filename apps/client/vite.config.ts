import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

import { dependencies } from './package.json';
import { alias } from './vite/aliases';

export const reactDeps = Object.keys(dependencies).filter(
  (key) => key === 'react' || key.startsWith('react-'),
);

export function renderChunks(deps: Record<string, string>, vendor: Set<string>) {
  const chunks: Record<string, string[]> = {};

  Object.keys(deps).forEach((key) => {
    if (!vendor.has(key)) {
      chunks[key] = [key];
    }
  });

  return chunks;
}
export const filenames = Object.freeze({
  entryFileNames: '[name].[hash].js',
  chunkFileNames: 'chunks/[name]-[hash].js',
  assetFileNames: 'assets/[name][extname]',
});

export const vendor = [
  'react',
  'react-router-dom',
  'react-dom',
  '@astral/ui',
  '@mui/material',
  '@mui/lab',
];

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  plugins: [react(), svgrPlugin({ svgrOptions: { icon: true } })],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (p) => p,
      },
    },
  },
  resolve: {
    alias: alias.map(({ find, replacement }) => ({
      find,
      replacement: path.resolve(__dirname, replacement),
    })),
  },
  build: {
    minify: true,
    outDir: resolve(__dirname, 'dist', 'client'),
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vendor,
    //       ...renderChunks(dependencies, new Set(vendor)),
    //     },
    //     ...filenames,
    //   },
    // },
  },
  optimizeDeps: { include: reactDeps },
});
