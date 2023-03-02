import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { INestApplication, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { IDataBaseService } from "../types";

export interface IPrismaService extends PrismaClient, IDataBaseService {
  enableShutdownHooks(app: INestApplication): Promise<void>;
}

@Injectable()
export class PrismaService extends PrismaClient implements IPrismaService, OnModuleInit {
  constructor(@Inject(TYPES.services.LoggerService) private readonly logger: ILogger) {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("[Database]: Database has been started");
    } catch (e) {
      this.logger.error(e);
      process.exit(1);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  async $disconnect() {
    return Promise.resolve();
  }
}
