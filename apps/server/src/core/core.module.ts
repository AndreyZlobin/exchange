import { BcryptModule, JwtModule } from "@common/auth";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/database/prisma/prisma.module";
import { RedisModule } from "@src/database/redis/redis.module";

import { AuthModule } from "./auth/auth.module";
import { OrderModule } from "./order/order.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    BcryptModule,
    JwtModule,
    UserModule,
    AuthModule,
    OrderModule,
  ],
})
export class CoreModule {}
