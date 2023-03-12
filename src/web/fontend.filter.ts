import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { resolveClientPath, resolveDistPath } from '@src/utils';
import { getViteServer } from '@src/vite-server';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { ViteDevServer } from 'vite';

export const isProduction = process.env.NODE_ENV === 'production';

const TEMPLATE_PLACEHOLDER = '<!--ssr-outlet-->';

const options = {
  prod: {
    templatePath: resolveDistPath('index.html'),
    renderPath: resolveDistPath('entry-server.js'),
  },
  dev: {
    templatePath: resolveClientPath('index.html'),
    renderPath: resolveClientPath('src', 'entry-server.tsx'),
  },
};

@Catch(NotFoundException)
export class FrontendRenderFilter implements ExceptionFilter {
  async catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const url = request.originalUrl;
    let template: string;
    let render: (url: string) => Promise<string>;

    let vite: ViteDevServer;

    try {
      if (isProduction) {
        const { templatePath, renderPath } = options.prod;

        template = readFileSync(templatePath, { encoding: 'utf-8' });
        render = (await import(renderPath)).render;
      } else {
        const { templatePath, renderPath } = options.dev;

        vite = await getViteServer();
        template = readFileSync(templatePath, 'utf-8');
        /**
         * @description
         * 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
         *    also applies HTML transforms from Vite plugins, e.g. global preambles
         *    from @vitejs/plugin-react
         * */
        template = await vite.transformIndexHtml(url, template);
        /**
         * @description
         * 3. Load the server entry. vite.ssrLoadModule automatically transforms
         *    your ESM source code to be usable in Node.js! There is no bundling
         *    required, and provides efficient invalidation similar to HMR.
         * */
        const plugin = await vite.ssrLoadModule(renderPath);

        render = plugin.render;
      }

      const appHtml = await render(url);

      const html = template.replace(TEMPLATE_PLACEHOLDER, appHtml);

      response.send(html);
    } catch (error) {
      const e = error as Error;

      vite && vite.ssrFixStacktrace(e);
      if (isProduction) {
        return response.status(500).send('Сервер не доступен');
      }
      throw new InternalServerErrorException(e);
    }
  }
}
