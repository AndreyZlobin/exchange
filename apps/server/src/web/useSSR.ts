import { NestExpressApplication } from '@nestjs/platform-express';
import { resolveClientPath, resolveDistPath } from '@src/utils';
import { getViteServer } from '@src/vite-server';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import * as process from 'process';
import { ViteDevServer } from 'vite';

const TEMPLATE_PLACEHOLDER = '<!--ssr-outlet-->';

const options = {
  prod: {
    templatePath: resolveDistPath('index.html'),
    renderPath: resolveDistPath('src', 'entry-server.tsx'),
  },
  dev: {
    templatePath: resolveClientPath('index.html'),
    renderPath: resolveClientPath('src', 'entry-server.tsx'),
  },
};
const isProduction = process.env.NODE_ENV === 'prod';

export const useSSR = async (app: NestExpressApplication) => {
  let template: string;
  let render: (url: string) => Promise<string>;
  let vite: ViteDevServer;

  await app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

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

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      const e = error as Error;

      vite && vite.ssrFixStacktrace(e);
      next(e);
    }
  });
};
