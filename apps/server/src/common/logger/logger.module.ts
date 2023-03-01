import { TYPES } from "@DI/types";
import { Global, Module } from "@nestjs/common";

import { LoggerService } from "./logger.service";
@Global()
@Module({
  providers: [{ provide: TYPES.services.LoggerService, useClass: LoggerService }],
  exports: [TYPES.services.LoggerService],
})
export class LoggerModule {}
