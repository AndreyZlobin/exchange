import { resolveClientPath } from "@src/utils/resolve-path";
import react from "@vitejs/plugin-react";
import type { ViteDevServer } from "vite";
import { createServer } from "vite";
let viteDevServer: ViteDevServer;

/**
 * get vite server
 * @param opts options
 * @param opts.force create vite server forcibly
 * @returns instance of vite server
 */
export async function getViteServer({ force } = { force: false }) {
  if (!viteDevServer || force) {
    viteDevServer = await createServer({
      plugins: [react()],
      publicDir: resolveClientPath("public"),
      server: {
        hmr: true,
        middlewareMode: true,
      },
      appType: "custom",
    });
  }

  return viteDevServer;
}
