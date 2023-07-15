import { Inject, Injectable } from '@nestjs/common';
import { EmailOptions } from './email.module';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_OPTIONS') private readonly emailOptions: EmailOptions,
    private readonly httpService: HttpService,
  ) {}

  async sendEmail(): Promise<void> {
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
        this.httpService.post(url, this.emailOptions, config),
      );

      return response.data;
    } catch (error) {
      // 处理请求错误
      throw new Error('Failed to send email');
    }
    console.log(JSON.stringify(this.emailOptions));
  }
}
