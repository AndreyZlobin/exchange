import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';

import { Order } from '../dto';
import { IOrderRepository } from '../repository';

export interface IOrderService {
  getUserOrders(userId: string): Promise<Order[]>;
}

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(TYPES.order.OrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  getUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.findAll(userId);
  }
}
