import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: 4200,
    host: "localhost",
    fs: {
      allow: [".."],
    },
  },
  publicDir: resolve(__dirname, "client", "public"),
  plugins: [react()],
  build: { minify: true, emptyOutDir: false },
  ssr: { format: "cjs" },
  legacy: { buildSsrCjsExternalHeuristics: true },
});
