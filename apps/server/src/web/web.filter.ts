import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { readFileSync } from "fs";
import { resolveClientPath, resolveDistPath } from "src/utils/resolve-path";
import type { ViteDevServer } from "vite";

import { getViteServer } from "../vite-server";

export const isProduction = process.env.NODE_ENV === "production";
const TEMPLATE_PLACEHOLDER = "<!-- template-placeholder -->";

@Catch(NotFoundException)
export class FrontendRenderFilter implements ExceptionFilter {
  async catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    const url = request.originalUrl;
    let vite: ViteDevServer;
    let template: string;
    let render: (url: string) => Promise<{ html: string }>;

    try {
      if (isProduction) {
        template = readFileSync(resolveDistPath("client", "index.html"), { encoding: "utf-8" });
        render = (await import(resolveDistPath("client", "entry-server.js"))).render;
      } else {
        vite = await getViteServer();
        template = readFileSync(resolveClientPath("index.html"), { encoding: "utf-8" });
        template = await vite.transformIndexHtml(url, template);
        const reactRenderer = resolveClientPath("entry-server.tsx");

        const plugin = await vite.ssrLoadModule(reactRenderer);

        render = plugin.render;
      }
      const { html } = await render(url);

      response.send(template.replace(TEMPLATE_PLACEHOLDER, html));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      vite && vite.ssrFixStacktrace(error);
      throw new InternalServerErrorException(error);
    }
  }
}
