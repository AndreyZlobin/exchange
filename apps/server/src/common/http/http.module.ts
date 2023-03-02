import { TYPES } from "@DI/types";
import { Global, Module } from "@nestjs/common";

import { HttpService } from "./http.service";
@Global()
@Module({
  providers: [{ provide: TYPES.services.HttpService, useClass: HttpService }],
  exports: [TYPES.services.HttpService],
})
export class HttpModule {}
