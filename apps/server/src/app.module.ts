import { BcryptModule, JwtModule } from "@common/auth";
import { ConfigModule } from "@common/configs";
import { DateModule } from "@common/date";
import { HttpModule } from "@common/http";
import { LoggerModule } from "@common/logger";
import { MiddlewareConsumer, Module, NestModule, Provider } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { UserContext } from "@shared/context";
import { UserInterceptor } from "@shared/interceptors";
import { AuthenticationMiddleware } from "@shared/middleware";
import { CoreModule } from "@src/core/core.module";
import { IntegrationModule } from "@src/core/integration/integration.module";
import { RolesGuard } from "@src/core/roles";
import { PrismaModule } from "@src/database/prisma/prisma.module";
import { RedisModule } from "@src/database/redis/redis.module";

import { AppController } from "./app.controller";

function getProviders(): Provider[] {
  return [
    UserContext,
    { provide: APP_INTERCEPTOR, useClass: UserInterceptor },
    { provide: APP_GUARD, useClass: RolesGuard },
  ];
}

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule,
    PrismaModule,
    HttpModule,
    LoggerModule,
    RedisModule,
    DateModule,
    IntegrationModule,
    CoreModule,
    BcryptModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: getProviders(),
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
