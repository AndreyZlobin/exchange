import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../DI/types";
import { ILogger } from "../../logger";
import { IDataBaseService } from "../types";

export interface IPrismaService extends IDataBaseService {
  client: PrismaClient;
}

@injectable()
export class PrismaService implements IPrismaService {
  public client: PrismaClient;
  constructor(@inject(TYPES.services.LoggerService) private readonly logger: ILogger) {
    this.client = new PrismaClient();
  }

  async $connect() {
    try {
      await this.client.$connect();
      this.logger.log("[Database]: Database has been started");
    } catch (e) {
      this.logger.error(e);
      process.exit(1);
    }
  }
  async $disconnect() {
    return Promise.resolve();
  }
}
