import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';

import { DateService } from './date.service';

@Global()
@Module({
  providers: [{ provide: TYPES.services.DateService, useClass: DateService }],
  exports: [TYPES.services.DateService],
})
export class DateModule {}
