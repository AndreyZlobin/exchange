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
import { mergeDeep } from "@src/utils/mergeDeep";
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
      this.app.use(helmet());
      const prismaService = this.app.get<IPrismaService>(TYPES.DB.PrismaService);
      const redisService = this.app.get<IRedisService>(TYPES.DB.RedisService);

      const prefix = this.config.get("API_VERSION");

      this.app.setGlobalPrefix(`api/${prefix}/`);
      this.app.useGlobalFilters(new ValidationExceptionFilter(this.logger));
      await Promise.all([prismaService.$connect(), redisService.$connect()]);
      await prismaService.enableShutdownHooks(this.app);
      this.swaggerInit();

      // const defaultWallet = {
      //   balance: 0,
      //   balanceDep: 0,
      //   address: "",
      //   walletDepositCheckAmount: 0,
      // };

      // const user = await prismaService.user.create({
      //   data: {
      //     active: true,
      //     name: "Test2",
      //     password: "test3",
      //     wallet: { create: defaultWallet },
      //     paymentSetting: {
      //       create: {
      //         systems: {
      //           ccard: {
      //             type: "ccard",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           sim: {
      //             type: "sim",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           qiwi: {
      //             type: "qiwi",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //           yandex: {
      //             type: "yandex",
      //             min: 300,
      //             max: 15000,
      //             brokerCommission: 0,
      //             systemCommission: 20,
      //             isAllow: false,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   include: { paymentSetting: true },
      // });

      //
      // const userId = "6404387a91f583f46c70840b";
      // const user = await prismaService.user.findUnique({
      //   where: { id: "6404300174d68d6ae002fad4" },
      //   include: { wallet: true, orders: true, _count: true, paymentSetting: true },
      // });

      // const payment = await prismaService.paymentSetting.findUnique({ where: { userId } });

      // const user = await prismaService.user.delete({
      //   where: { id: "6402fc5c51519026d5ed9a7b" },
      //   include: { wallet: true, orders: true },
      // });

      // const user = await prismaService.user.findMany();

      // const user = await prismaService.user.deleteMany();
      //
      // console.log(user);
      // console.log(user);
      // console.log(payment);

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
