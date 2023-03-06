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
    HttpModule,
    LoggerModule,
    DateModule,
    IntegrationModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: getProviders(),
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}
