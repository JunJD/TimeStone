import {
  Post,
  Controller,
  Body,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { EmailService } from '../email/email.service';
import { VerifyCodeDto } from './dto/cerify-code.dto';

/**
 * 注册--
 * 1、输入邮箱和验证码注册==> 设置处可以设置name/password
 * 2、输入账户和密码注册===> 设置处可以绑定邮箱
 * 登录--
 * 1、输入邮箱和验证码登录===> 验证邮箱和验证码是否正确即可
 * 2、输入账户和密码登录===> 验证登录账户和密码是否正确即可
 */
@Controller('auth')
export class AuthController {
  verificationCodeMap = new Map();
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  // 注册生成验证码
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sendCode')
  async sendCode(@Body() createUserDto: CreateUserDto) {
    const { verificationCode } = await this.emailService.sendEmail(
      'timeStone注册校验',
      createUserDto.email,
    );
    this.verificationCodeMap.set(createUserDto.email, {
      verificationCode,
      storedTimestamp: new Date().getTime(),
    });
    return `动态验证码已发送到${createUserDto.email}`;
  }

  // 验证生成验证码
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    const currentTime = new Date().getTime(); // 当前时间
    const expirationTime = 1 * 60 * 1000; // 验证码有效期为1分钟，单位为毫秒
    if (this.verificationCodeMap.has(dto.email)) {
      const { verificationCode: storedCode, storedTimestamp } =
        this.verificationCodeMap.get(dto.email);

      if (
        dto.code === storedCode &&
        currentTime <= storedTimestamp + expirationTime
      ) {
        // 注册register
        return await this.signUp({
          email: dto.email,
          password: dto.password,
          name: dto.name,
        });
      }
    }
    throw new HttpException('请重新发送验证码', 402);
  }

  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto);
  }
}
