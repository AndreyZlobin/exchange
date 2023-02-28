import "reflect-metadata";

import { TYPES } from "@DI/types";
import { AppModule } from "@modules/app/app.module";
import { NestFactory } from "@nestjs/core";
import { IBotService } from "@src/services";
import { inject, injectable } from "inversify";
import * as process from "process";

import { ValidationExceptionFilter } from "./app/shared/exceptions";
import { botService, configService, DBCollection, loggerService } from "./DI";
import { ConfigServiceWithEnv, ILogger, IPrismaService, IRedisService } from "./infra";

const { prismaService, redisService } = DBCollection;

@injectable()
class Bootstrap {
  constructor(
    @inject(TYPES.services.ConfigService) private readonly config: ConfigServiceWithEnv,
    @inject(TYPES.services.LoggerService) private readonly logger: ILogger,
    @inject(TYPES.DB.RedisService) private readonly redisService: IRedisService,
    @inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService,
    @inject(TYPES.services.BotService) private readonly botService: IBotService,
  ) {}
  async start() {
    try {
      await Promise.all([this.prismaService.$connect(), this.redisService.$connect()]);
      const port = Number(this.config.get("PORT"));
      const prefix = this.config.get("API_VERSION");
      //     server.start();
      const app = await NestFactory.create(AppModule);

      app.useGlobalFilters(new ValidationExceptionFilter(this.logger));
      app.setGlobalPrefix(`api/${prefix}/`);
      await app.listen(port);
      this.logger.log(`[Server]: Server was started on PORT ${port} | http://localhost:${port}`);
    } catch (error) {
      this.logger.error("[Server]: Server can't be started", error);
      process.exit(1);
    }
  }
}

const bootstrap = new Bootstrap(
  configService,
  loggerService,
  redisService,
  prismaService,
  botService,
);

bootstrap.start();
