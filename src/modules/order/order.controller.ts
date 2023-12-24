import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './common/entity/order.entity';

@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Get('all')
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  // @Roles(OrderRole.ADMIN)
  @Post('infoById')
  getInfoByOrderId(
    @Body() findOrderDto: { id: number },
  ): Promise<Order | undefined> {
    return this.orderService.findOne(findOrderDto);
  }
}
