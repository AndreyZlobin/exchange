import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [{ provide: TYPES.DB.PrismaService, useClass: PrismaService }],
  exports: [TYPES.DB.PrismaService],
})
export class PrismaModule {}
