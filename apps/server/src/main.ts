import "reflect-metadata";

import { ConfigServiceWithEnv } from "@common/configs";
import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { NestFactory } from "@nestjs/core";
import { ValidationExceptionFilter } from "@shared/exceptions";
import { AppModule } from "@src/app.module";
import { IPrismaService, IRedisService } from "@src/database";

class Bootstrap {
  async start() {
    try {
      const app = await NestFactory.create(AppModule);
      const prismaService = app.get<IPrismaService>(TYPES.DB.PrismaService);

      const redisService = app.get<IRedisService>(TYPES.DB.RedisService);
      const config = app.get<ConfigServiceWithEnv>(TYPES.services.ConfigService);
      const logger = app.get<ILogger>(TYPES.services.LoggerService);

      const port = Number(config.get("PORT"));
      const prefix = config.get("API_VERSION");

      app.setGlobalPrefix(`api/${prefix}/`);
      app.useGlobalFilters(new ValidationExceptionFilter(logger));
      await Promise.all([prismaService.$connect(), redisService.$connect()]);
      await prismaService.enableShutdownHooks(app);
      await app.listen(port);

      // const data = await prismaService.log.findMany();
      //
      // console.log(data);

      // const data = await prismaService.client.log.create({
      //   data: {
      //     action: "123123",
      //     source: "123123",
      //     created: Date.now(),
      //     data: {},
      //   },
      // });

      logger.log(`[Server]: Server was started on PORT ${port} | http://localhost:${port}`);
    } catch (error) {
      process.exit(1);
    }
  }
}

const bootstrap = new Bootstrap();

bootstrap.start();
