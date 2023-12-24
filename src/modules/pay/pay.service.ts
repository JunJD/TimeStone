import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AliPayDto } from './dto/ali-pay.dto';
import { OrderService } from '../order/order.service';
import { OrderStatus, PaymentStatus } from '../order/common/types/status';
import { Order } from '../order/common/entity/order.entity';
import AlipaySdk, { AlipaySdkCommonResult } from 'alipay-sdk';
import { sleep } from 'src/utils/sleep';

@Injectable()
export class PayService {
  constructor(
    private orderService: OrderService,
    @Inject('ALI_PAY_SDK') private readonly alipaySdk: AlipaySdk,
  ) {
    // 初始化
  }
  async pay(aliPayDto: AliPayDto, paymentMethod = 'alipay'): Promise<Order> {
    const order = await this.orderService.createOrder({
      totalPrice: aliPayDto.totalAmount,
      status: OrderStatus.Pending,
      paymentStatus: PaymentStatus.Pending,
      tokenAmount: aliPayDto.tokenAmount,
      paymentMethod,
    });
    const orderId = order.orderId;

    // if  paymentMethod === 'alipay')
    const payInfo: AlipaySdkCommonResult = await this.precreateByAliPay(
      orderId,
      aliPayDto.totalAmount,
      aliPayDto.subject,
    );

    if (payInfo.code !== '10000') {
      this.getAliPayError(payInfo);
      throw new HttpException('生成支付二维码出错', 405);
    }

    // 开始轮训结果
    if (payInfo.code === '10000') {
      console.log('开始轮训结果');
      this.pollPayResult(order);
    }

    return order;
  }

  async pollPayResult(order: Order) {
    let tradeStatus;
    const result = await this.queryByAliPay(order.orderId);
    const startTime = Date.now();
    while (
      tradeStatus !== 'TRADE_SUCCESS' &&
      Date.now() - startTime <= 1000 * 60
    ) {
      console.log(
        ' Date.now() - startTime <= 1000 * 60=>',
        Date.now(),
        startTime <= 1000 * 60,
        Date.now() - startTime <= 1000 * 60,
      );
      await sleep(3000);
      const {
        code,
        buyerLogonId,
        buyerPayAmount,
        tradeStatus: _tradeStatus,
      } = result;
      console.log(code, buyerLogonId, buyerPayAmount, _tradeStatus);
      tradeStatus = _tradeStatus;
    }

    if (tradeStatus !== 'TRADE_SUCCESS') {
      // 取消支付
    } else {
      const updateResult = await this.orderService.updateOrder(order.id, {
        ...order,
        status: OrderStatus.Completed,
        paymentStatus: PaymentStatus.Completed,
      });
      console.log('updateResult==>', updateResult);
      // 更新订单状态
    }
  }

  // precreate
  async precreateByAliPay(orderId, totalAmount, subject) {
    try {
      const result = await this.alipaySdk.exec('alipay.trade.precreate', {
        bizContent: {
          out_trade_no: orderId,
          total_amount: totalAmount,
          subject: subject,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(JSON.stringify(error), 405);
    }
  }
  getAliPayError(payInfo) {
    console.log('报错了==>', payInfo);
  }
  // query
  async queryByAliPay(orderId) {
    try {
      const result = await this.alipaySdk.exec('alipay.trade.query', {
        bizContent: {
          out_trade_no: orderId,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(JSON.stringify(error), 405);
    }
  }
}
