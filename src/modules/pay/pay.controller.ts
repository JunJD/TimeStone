import { Body, Controller, Post } from '@nestjs/common';
import { AliPayDto } from './dto/ali-pay.dto';
import { PayService } from './pay.service';
import { Public } from '../auth/decorators/public.decorator';
import { Order } from '../order/common/entity/order.entity';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Public()
  @Post('alipay')
  aliPay(@Body() aliPayDto: AliPayDto): Promise<Order> {
    return this.payService.pay(aliPayDto);
  }
}
