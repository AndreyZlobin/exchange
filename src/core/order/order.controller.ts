import { TYPES } from "@DI/types";
import { Controller, Get, Inject, Injectable, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

import { IOrderService } from "./services";
@Injectable()
@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(@Inject(TYPES.order.OrderService) private readonly orderService: IOrderService) {}
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath("Order") },
  })
  @Get(":id")
  get() {
    return true;
  }
  @Post("/create")
  create() {
    return false;
  }
  @Get("/all")
  getAll() {
    return true;
  }
  @Get("/all/:id")
  getUserAll(@Param("id") userId: string) {
    return this.orderService.getUserOrders(userId);
  }
}
