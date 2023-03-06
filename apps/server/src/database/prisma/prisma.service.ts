import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { INestApplication, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

import { IDataBaseService } from "../types";

export interface IPrismaService extends PrismaClient, IDataBaseService {
  enableShutdownHooks(app: INestApplication): Promise<void>;
  getSelectedField<T extends object>(fieldsList: Array<keyof T>): Record<keyof T, true>;
}

@Injectable()
export class PrismaService extends PrismaClient implements IPrismaService, OnModuleInit {
  constructor(@Inject(TYPES.services.LoggerService) private readonly logger: ILogger) {
    super();
    this.applyMiddleware();
  }

  applyMiddleware() {
    this.softDeleteModel("User");
    this.softDeleteModel("Wallet");
    this.softDeleteModel("Order");
  }

  public getSelectedField<T extends object>(fieldsList: Array<keyof T>) {
    return fieldsList.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<keyof T, true>);
  }

  private softDeleteModel(modelName: Prisma.ModelName) {
    this.$use(async (params, next) => {
      const isCurrentModel = params.model === modelName;

      if (!isCurrentModel) {
        return next(params);
      }

      const deleteActions = ["delete", "deleteMany"];

      if (deleteActions.includes(params.action)) {
        params.action = params.action.replace("delete", "update") as Prisma.PrismaAction;
        const args = { ...(params.args ?? {}) };
        const data = { ...(params.args?.data ?? {}), ...{ deleted: true } };

        params.args = { ...args, data };
      }

      return next(params);
    });
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
