import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios';

export interface EmailOptions {
  RapidAPIKey: string;
  RapidAPIHost: string;
  personalizations: {
    to: {
      name: string;
      email: string;
    }[];
    subject: string;
  }[];
  from: {
    email: string;
  };
  content: {
    type: string;
    value: string;
  }[];
}

@Module({
  imports: [HttpModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  static forRoot(emailOptions: EmailOptions) {
    return {
      module: EmailModule,
      providers: [
        {
          provide: 'EMAIL_OPTIONS',
          useValue: emailOptions,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
