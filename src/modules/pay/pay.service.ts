import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AliPayDto } from './dto/ali-pay.dto';
import { OrderService } from '../order/order.service';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '../order/common/types/status';
import { Order } from '../order/common/entity/order.entity';
import AlipaySdk, { AlipaySdkCommonResult } from 'alipay-sdk';
import { sleep } from 'src/utils/sleep';
import {
  ALI_PAY_SDK_PROVIDER,
  PRE_CREATE_PAY,
  TRADE_QUERY_PAY,
  TRADE_STATUS,
} from './common/constants';

@Injectable()
export class PayService {
  constructor(
    private orderService: OrderService,
    @Inject(ALI_PAY_SDK_PROVIDER) private readonly alipaySdk: AlipaySdk,
  ) {
    // 初始化
  }
  async pay(
    aliPayDto: AliPayDto,
    paymentMethod = PaymentMethod.AliPay,
  ): Promise<Order> {
    // 创建一个订单
    const order = await this.orderService.createOrder({
      totalPrice: aliPayDto.totalAmount,
      status: OrderStatus.Pending,
      paymentStatus: PaymentStatus.Pending,
      tokenAmount: aliPayDto.tokenAmount,
      paymentMethod,
      subject: aliPayDto.subject,
    });

    if (paymentMethod === PaymentMethod.AliPay) {
      await this.alipay(order);
    }
    return order;
  }

  async alipay(order: Order) {
    const payInfo: AlipaySdkCommonResult = await this.precreateByAliPay(
      order.orderId,
      order.totalPrice,
      order.subject,
    );

    if (payInfo.code !== '10000') {
      this.getAliPayError(payInfo, order);
      throw new HttpException('生成支付二维码出错', 405);
    }

    // 开始轮训结果
    if (payInfo.code === '10000') {
      console.log('开始轮训结果');
      this.pollPayResult(order);
    }
  }

  async pollPayResult(order: Order) {
    let tradeStatus: TRADE_STATUS;
    const result = await this.queryByAliPay(order.orderId);
    const startTime = Date.now();
    const overtime = 60; /**秒 */
    const delay = 3; /**秒 */
    while (
      tradeStatus !== TRADE_STATUS.TRADE_SUCCESS &&
      Date.now() - startTime <= 1000 * overtime
    ) {
      await sleep(1000 * delay);
      const {
        code,
        buyerLogonId,
        buyerPayAmount,
        tradeStatus: _tradeStatus,
      } = result;
      console.log(code, buyerLogonId, buyerPayAmount, _tradeStatus);
      tradeStatus = _tradeStatus;
    }

    if (tradeStatus !== TRADE_STATUS.TRADE_SUCCESS) {
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
      const result = await this.alipaySdk.exec(PRE_CREATE_PAY.ALIPAY, {
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
  async getAliPayError(payInfo, order) {
    await this.orderService.updateOrder(order.id, {
      ...order,
      status: OrderStatus.Cancelled,
      paymentStatus: PaymentStatus.Cancelled,
    });
  }

  // query
  async queryByAliPay(orderId) {
    try {
      const result = await this.alipaySdk.exec(TRADE_QUERY_PAY.ALIPAY, {
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
