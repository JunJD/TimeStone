import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';
import { OrderModule } from '../order/order.module';
import { ConfigModule } from 'src/config/config.module';
import AlipaySdk from 'alipay-sdk';
import { ALI_PAY_SDK_PROVIDER } from './common/constants';

export interface PayOption {
  appId: string;
  privateKey: string;
  alipayPublicKey: string;
  gateway?: string;
}

// import { OrderService } from '../order/order.service';
@Module({
  imports: [OrderModule, ConfigModule.register({ folder: './config' })],
  controllers: [PayController],
  providers: [PayService],
  exports: [PayService],
})
export class PayModule {
  static forRootByAliPay(alipaySdk: AlipaySdk) {
    return {
      module: PayModule,
      providers: [
        {
          provide: ALI_PAY_SDK_PROVIDER,
          useValue: alipaySdk,
        },
        PayService,
      ],
      exports: [PayService],
    };
  }
}
