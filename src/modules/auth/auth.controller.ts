import { Post, Controller, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { EmailService } from '../email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    console.log(await this.emailService.sendEmail());
    return this.authService.signIn(loginAuthDto);
  }
}
