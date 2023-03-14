import { BcryptModule, JwtModule } from '@common/auth';
import { ConfigModule } from '@common/configs';
import { DateModule } from '@common/date';
import { HttpModule } from '@common/http';
import { LoggerModule } from '@common/logger';
import { TYPES } from '@DI/types';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserContext } from '@shared/context';
import { UserInterceptor } from '@shared/interceptors';
import { AuthenticationMiddleware } from '@shared/middleware';
import { AuthCacheService } from '@src/core/auth/cache/cache.service';
import { IntegrationModule } from '@src/core/integration/integration.module';
import { RolesGuard, SelfWithRoleGuard } from '@src/core/roles';
import { WalletModule } from '@src/core/wallet/wallet.module';
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
    SelfWithRoleGuard,
    RolesGuard,
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
    WalletModule,
  ],
})
export class CoreModule implements NestModule {
  private readonly authRouteMiddlewareCollections: Array<{ path: string; method: RequestMethod }> =
    [
      // auth
      { path: 'auth/reset_password', method: RequestMethod.POST },
      { path: 'auth/logout', method: RequestMethod.POST },
      // user
      { path: 'user/*', method: RequestMethod.ALL },
      { path: 'settings/*', method: RequestMethod.ALL },
      // Order
      { path: 'orders/*', method: RequestMethod.ALL },
      // Wallet
      { path: 'wallet/*', method: RequestMethod.ALL },
    ];
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(...this.authRouteMiddlewareCollections);
  }
}
