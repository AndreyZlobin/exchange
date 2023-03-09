import { resolveClientPath } from "@src/utils";
import * as path from "path";
import * as process from "process";
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
      publicDir: resolveClientPath("public"),
      server: { middlewareMode: true },
      appType: "custom",
      root: path.resolve(process.cwd() + "/client"),
      configFile: path.resolve(process.cwd() + "/client/vite.config.ts"),
    });
  }

  return viteDevServer;
}
