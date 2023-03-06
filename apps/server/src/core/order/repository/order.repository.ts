import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { Order } from "@src/core/order/dto";
import { IPrismaService } from "@src/database";

export interface IOrderRepository {
  findAll(userId?: string): Promise<Order[]>;
}
@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}

  findAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
}
