import { BcryptModule, JwtModule } from '@common/auth';
import { ConfigModule } from '@common/configs';
import { DateModule } from '@common/date';
import { HttpModule } from '@common/http';
import { LoggerModule } from '@common/logger';
import { TYPES } from '@DI/types';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserContext } from '@shared/context';
import { UserInterceptor } from '@shared/interceptors';
import { AuthenticationMiddleware } from '@shared/middleware';
import { AuthCacheService } from '@src/core/auth/cache/cache.service';
import { IntegrationModule } from '@src/core/integration/integration.module';
import { RolesGuard } from '@src/core/roles';
import { PrismaModule } from '@src/database/prisma/prisma.module';
import { RedisModule } from '@src/database/redis/redis.module';

import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [
    UserContext,
    { provide: TYPES.auth.AuthCacheService, useClass: AuthCacheService },
    { provide: APP_INTERCEPTOR, useClass: UserInterceptor },
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthenticationMiddleware,
  ],
  imports: [
    ConfigModule,
    HttpModule,
    LoggerModule,
    RedisModule,
    DateModule,
    IntegrationModule,
    BcryptModule,
    JwtModule,
    PrismaModule,
    RedisModule,
    BcryptModule,
    JwtModule,
    UserModule,
    AuthModule,
    OrderModule,
  ],
})
export class CoreModule implements NestModule {
  private readonly authRouteMiddlewareCollections: Array<{ path: string; method: RequestMethod }> =
    [
      // auth
      { path: 'auth/reset_password', method: RequestMethod.POST },
      { path: 'auth/logout', method: RequestMethod.POST },
      { path: 'auth/refresh', method: RequestMethod.POST },
      // user
      { path: 'user/all', method: RequestMethod.GET },
      { path: 'user/profile', method: RequestMethod.GET },
      // user
      { path: 'order/*', method: RequestMethod.ALL },
    ];
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(...this.authRouteMiddlewareCollections);
  }
}
