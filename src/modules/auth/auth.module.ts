import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants';
import { EmailModule, EmailOptions } from '../email/email.module';
import { config } from 'dotenv';
config();
const emailOptions: EmailOptions = {
  RapidAPIKey: process.env.EMAIL_RapidAPI_Key,
  RapidAPIHost: process.env.EMAIL_RapidAPI_Host,
  personalizations: [
    {
      to: [
        {
          name: 'Ding',
          email: '864546065@qq.com',
        },
      ],
      subject: 'timeStone注册校验',
    },
  ],
  from: {
    email: 'auth@timeStone.com',
  },
  content: [
    {
      type: 'text/plain',
      value: '908212',
    },
  ],
};

// 全局模块
@Module({
  imports: [
    UserModule,
    EmailModule.forRoot(emailOptions),
    // 导入jwt模块,并配置,global: true表示全局模块,所有模块都可以使用
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 30 * 24 * 60 * 60 },
    }),
  ],
  providers: [
    AuthService, // 导入UsersService，方便其他模块使用
    // 全局守卫，所有路由都会被守卫拦截
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  // 导出模块，方便其他模块使用
  exports: [AuthService],
})
export class AuthModule {}
