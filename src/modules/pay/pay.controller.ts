import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AliPayDto } from './dto/ali-pay.dto';
import { PayService } from './pay.service';
import { Public } from '../auth/decorators/public.decorator';
import { Order } from '../order/common/entity/order.entity';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('alipay')
  aliPay(@Body() aliPayDto: AliPayDto, @Req() req: Request): Promise<Order> {
    return this.payService.pay(aliPayDto, req);
  }

  @Public()
  @Get('alipay/:orderId')
  queryStatu(@Param('orderId') orderId: number) {
    console.log(orderId);
  }
}
