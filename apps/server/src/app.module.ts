import { BcryptModule, JwtModule } from "@common/auth";
import { ConfigModule } from "@common/configs";
import { DateModule } from "@common/date";
import { LoggerModule } from "@common/logger";
import { Module } from "@nestjs/common";
import { CoreModule } from "@src/core/core.module";
import { PrismaModule } from "@src/database/prisma/prisma.module";
import { RedisModule } from "@src/database/redis/redis.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule,
    RedisModule,
    DateModule,
    CoreModule,
    BcryptModule,
    JwtModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
