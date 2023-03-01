import { TYPES } from "@DI/types";
import { Global, Module } from "@nestjs/common";

import { RedisService } from "./redis.service";

@Global()
@Module({
  providers: [{ provide: TYPES.DB.RedisService, useClass: RedisService }],
  exports: [TYPES.DB.RedisService],
})
export class RedisModule {}
