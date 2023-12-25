import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './modules/user/user.module';
import { CorsMiddleware } from './common/middlewares/cors.middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { OrderModule } from './modules/order/order.module';
import { PayModule, PayOption } from './modules/pay/pay.module';
import { config } from 'dotenv';
import AlipaySdk from 'alipay-sdk';
import { AssistantModule } from './modules/assistant/assistant.module';
import { SessionModule } from './modules/session/session.module';
config();
const payOption: PayOption = {
  appId: process.env.ALIPAY_APP_ID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
  gateway: process.env.GATEWAY,
};

const alipaySdk = new AlipaySdk(payOption); // 初始化alipay 支付

@Module({
  imports: [
    ConfigModule.register({ folder: './config' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: true, // 添加 ssl 配置
        extra: {
          sslmode: 'require', // 设置 sslmode 为 require
        },
      }),
      inject: [ConfigService],
    }),
    UserModule, // 用户
    AuthModule, // 权限
    FileModule, // 文件
    PayModule.forRootByAliPay(alipaySdk), // 支付
    OrderModule, // 订单
    AssistantModule, // 助理设定
    SessionModule, // 上下文
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
