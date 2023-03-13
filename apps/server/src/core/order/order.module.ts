import { TYPES } from '@DI/types';
import { Module } from '@nestjs/common';
import { OrderRepository } from '@src/core/order/repository';
import { OrderService } from '@src/core/order/services';

import { OrderController } from './order.controller';
@Module({
  providers: [
    { provide: TYPES.order.OrderRepository, useClass: OrderRepository },
    { provide: TYPES.order.OrderService, useClass: OrderService },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
