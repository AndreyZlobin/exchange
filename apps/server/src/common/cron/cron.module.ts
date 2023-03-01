import { TYPES } from "@DI/types";
import { Global, Module } from "@nestjs/common";

import { CronService } from "./cron.service";

@Global()
@Module({
  providers: [{ provide: TYPES.services.ConfigService, useClass: CronService }],
  exports: [TYPES.services.ConfigService],
})
export class CronModule {}
