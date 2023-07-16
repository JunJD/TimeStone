import { HttpException, Inject, Injectable } from '@nestjs/common';
import { EmailOptions } from './email.module';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_OPTIONS') private readonly emailOptions: EmailOptions,
    private readonly httpService: HttpService,
  ) {}

  async sendEmail(
    type: string,
    email: CreateUserDto['email'],
    name?: CreateUserDto['name'],
  ) {
    const verificationCode = this.generateVerificationCode();
    const _emailOptions = {
      RapidAPIKey: process.env.EMAIL_RapidAPI_Key,
      RapidAPIHost: process.env.EMAIL_RapidAPI_Host,
      personalizations: [
        {
          to: [
            {
              name: name ?? email,
              email: email,
            },
          ],
          subject: type,
        },
      ],
      from: {
        email: this.emailOptions.formEmail,
      },
      content: [
        {
          type: 'text/plain',
          value: `你的验证码是：${verificationCode}`,
        },
      ],
    };
    // 使用 this.emailOptions 进行邮件发送逻辑
    const url = 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send';

    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.emailOptions.RapidAPIKey,
      'X-RapidAPI-Host': this.emailOptions.RapidAPIHost,
    };

    const config = {
      headers: headers,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, _emailOptions, config),
      );

      return { ...response.data, verificationCode };
    } catch (error) {
      // 处理请求错误
      throw new HttpException('Failed to send email', 402);
    }
  }

  generateVerificationCode(length = 6) {
    const characters = '0123456789';
    let verificationCode = '';

    for (let i = 0; i < length; i++) {
      verificationCode += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return verificationCode;
  }
}
