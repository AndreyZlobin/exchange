import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { CoreModule } from "@src/core/core.module";

import { AppController } from "./app.controller";

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 10 }), CoreModule],
  controllers: [AppController],
})
export class AppModule {}
