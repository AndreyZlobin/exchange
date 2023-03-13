import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from '@src/core/core.module';
import { join } from 'path';

import { AppController } from './app.controller';
@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    CoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
