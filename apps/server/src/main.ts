import "reflect-metadata";

import { ConfigServiceWithEnv } from "@common/configs";
import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ValidationExceptionFilter } from "@shared/exceptions";
import { AppModule } from "@src/app.module";
// import { IGarantexService } from "@src/core/integration/services";
import { IPrismaService, IRedisService } from "@src/database";
import { mergeDeep } from "@src/utils/mergeDeep";
import { getViteServer } from "@src/vite-server";
import { FrontendRenderFilter, isProduction } from "@src/web/web.filter";
import * as compression from "compression";
import { readFileSync } from "fs";
import helmet from "helmet";
const loadDockFileAndUpdateDocument = (
  pathToFile: string,
  document: OpenAPIObject,
): OpenAPIObject | null => {
  try {
    const json = readFileSync(pathToFile, "utf8");

    const data: OpenAPIObject["components"]["schemas"] = JSON.parse(json).definitions;
    const clone = structuredClone(document);

    clone.components.schemas = data;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clone.definitions = data;
    return clone;
  } catch (e) {
    return null;
  }
};

class Bootstrap {
  private app: INestApplication;

  get config() {
    return this.app.get<ConfigServiceWithEnv>(TYPES.services.ConfigService);
  }

  get logger() {
    return this.app.get<ILogger>(TYPES.services.LoggerService);
  }

  get port() {
    return Number(this.config.get("PORT"));
  }

  async ssrInit() {
    if (isProduction) {
      /**
       * @todo
       * replace to
       * imports: [
       *     ServeStaticModule.forRoot({
       *       rootPath: join(__dirname, '..', 'client'),
       *     }),
       *   ],
       * */
      // import { resolveDistPath } from "@src/utils";

      // this.app.useStaticAssets(resolveDistPath("client"), {
      //   index: false,
      // });

      this.app.use(compression());
    } else {
      const vite = await getViteServer({ force: true });

      this.app.use(vite.middlewares);
    }
    this.app.enableCors({
      origin: "*",
      credentials: true,
      allowedHeaders: "Content-Type, Accept, Origin",
      preflightContinue: false,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    });
    this.app.useGlobalFilters(new FrontendRenderFilter());
    // this.app.useGlobalPipes(
    //   new ValidationPipe({
    //     transform: true,
    //   }),
    // );
  }
  swaggerInit() {
    try {
      const options = new DocumentBuilder()
        .setTitle("Sample API")
        .setDescription("A simple API for demonstration purposes")
        .setVersion("1.0")
        .addBearerAuth(
          {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "JWT",
            description: "Enter JWT token",
            in: "header",
          },
          "JWT",
        )
        .build();

      const document = SwaggerModule.createDocument(this.app, options, {});

      const updatedDoc =
        loadDockFileAndUpdateDocument("./src/apiDoc/schema/json-schema.json", document) || document;

      SwaggerModule.setup("api/docs", this.app, mergeDeep(updatedDoc, document));
      this.logger.log(
        `[${SwaggerModule.name}]: Swagger here | http://localhost:${this.port}/api/docs`,
      );
    } catch (e) {
      this.logger.error(`[${SwaggerModule.name}]: Can't load swagger docs`, e);
    }
  }

  async start() {
    try {
      this.app = await NestFactory.create(AppModule);
      this.app.use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              connectSrc: ["'self'", "ws://localhost:24678"],
            },
          },
        }),
      );
      const prismaService = this.app.get<IPrismaService>(TYPES.DB.PrismaService);
      const redisService = this.app.get<IRedisService>(TYPES.DB.RedisService);
      const prefix = this.config.get("API_VERSION");

      this.app.setGlobalPrefix(`api/${prefix}/`);
      this.app.useGlobalFilters(new ValidationExceptionFilter(this.logger));

      await Promise.all([prismaService.$connect(), redisService.$connect()]);
      await prismaService.enableShutdownHooks(this.app);

      this.swaggerInit();
      // const garantexService = this.app.get<IGarantexService>(TYPES.integration.GarantexService);
      /*      /!**
       * @description
       * Поставщик переводит 100.000р при курсе биткоина 1.000.000 (garantex), с комиссией 3% (1.000.000 + 3%), итого он получает биткоинов на : 100.000 / 1.030.000 (1.000.000 +3%) = 0,09708
       * Поставщик заплатил 100.000 получил 0,09708
       * Теперь берем продавца, он продает биткоин, предположим на его счете 1 биткоин. Ему прилетела заявка на 100.000р - он выдал реквизит, получил оплату, закрыл заявку. Сколько биткоинов он отдает ?
       * 100.000 / 1.020.000 = 0,0980392
       * Итого продавец получил 100.000р, отдал 0.0980392
       * Прибыль платформы : 0.0980392 - 0.09708 = 0,00095921 btc
       * *!/
      class User {
        private getPercent(number: number, percent: number) {
          const decimalPercent = percent / 100;

          return number * decimalPercent;
        }
        getQuantityOfCurrency(currencyPrice: number, clientAmount: number, percent: number) {
          if (percent < 0 || percent > 100) {
            throw new Error("Percent value must be between 0 and 100");
          }
          const percentOfCurrencyPrice = this.getPercent(currencyPrice, percent);

          return clientAmount / (currencyPrice + percentOfCurrencyPrice);
        }
      }
      const btcPrice = await garantexService.getBtcPrice();
      const usdtPrice = await garantexService.getUSDTPrice();

      const user = new User();
      const privider = user.getQuantityOfCurrency(1_000_000, 100_000, 3);
      const seller = user.getQuantityOfCurrency(1_000_000, 100_000, 2);
      const profit = seller - privider;

      console.log({ privider });
      console.log({ seller });
      console.log({ profit });
      console.log({ btc: user.getQuantityOfCurrency(btcPrice, 100_000, 3) });
      console.log({ usd: user.getQuantityOfCurrency(usdtPrice, 300, 1) });*/
      await this.ssrInit();
      await this.app.listen(this.port);
      this.logger.log(
        `[Server]: Server was started on PORT ${this.port} | http://localhost:${this.port}`,
      );
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }
}

const bootstrap = new Bootstrap();

bootstrap.start();
