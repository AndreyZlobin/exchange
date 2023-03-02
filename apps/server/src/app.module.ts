import { BcryptModule, JwtModule } from "@common/auth";
import { ConfigModule } from "@common/configs";
import { DateModule } from "@common/date";
import { LoggerModule } from "@common/logger";
import { MiddlewareConsumer, Module, NestModule, Provider } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { UserContext } from "@shared/context";
import { UserInterceptor } from "@shared/interceptors";
import { AuthenticationMiddleware } from "@shared/middleware";
import { CoreModule } from "@src/core/core.module";
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
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "public"),
    // }),
    PrismaModule,
    ConfigModule,
    LoggerModule,
    RedisModule,
    DateModule,
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
