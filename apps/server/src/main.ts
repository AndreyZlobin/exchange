import "reflect-metadata";

import { ConfigServiceWithEnv } from "@common/configs";
import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ValidationExceptionFilter } from "@shared/exceptions";
import { AppModule } from "@src/app.module";
import { IPrismaService, IRedisService } from "@src/database";
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

  swaggerInit() {
    try {
      const options = new DocumentBuilder()
        .setTitle("Sample API")
        .setDescription("A simple API for demonstration purposes")
        .setVersion("1.0")
        .build();

      const document = SwaggerModule.createDocument(this.app, options, {});

      const updatedDoc =
        loadDockFileAndUpdateDocument("./src/apiDoc/schema/json-schema.json", document) || document;

      SwaggerModule.setup("api/docs", this.app, updatedDoc);
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
      this.app.use(helmet());
      const prismaService = this.app.get<IPrismaService>(TYPES.DB.PrismaService);
      const redisService = this.app.get<IRedisService>(TYPES.DB.RedisService);

      const prefix = this.config.get("API_VERSION");

      this.app.setGlobalPrefix(`api/${prefix}/`);
      this.app.useGlobalFilters(new ValidationExceptionFilter(this.logger));
      await Promise.all([prismaService.$connect(), redisService.$connect()]);
      await prismaService.enableShutdownHooks(this.app);
      this.swaggerInit();

      // const defaultWallet = { balance: 123 };
      // const user = await prismaService.user.create({
      //   data: { active: true, name: "Test2", password: "test3", wallet: { create: defaultWallet } },
      // });
      //
      // await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: { balance: 0 } },
      //   },
      // });
      // await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: { balance: 30 } },
      //   },
      // });
      // await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: { balance: 50 } },
      //   },
      // });
      // await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: { balance: 44.5 } },
      //   },
      // });

      // const user = await prismaService.user.findUnique({
      //   where: { id: "6402edd57d7f0a9ebafe317b" },
      //   include: { wallet: true, orders: true },
      // });

      // const user = await prismaService.user.delete({
      //   where: { id: "6402fc5c51519026d5ed9a7b" },
      //   include: { wallet: true, orders: true },
      // });

      // const user = await prismaService.user.findMany();

      // const user = await prismaService.user.deleteMany();
      //
      // console.log(user);

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
