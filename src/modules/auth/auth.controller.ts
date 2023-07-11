import {
  Post,
  Controller,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/common/entity/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.findOne(
      createUserDto as Pick<CreateUserDto, 'email'>,
    );
    if (user) {
      throw new HttpException('用户已存在', 401);
    }
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto);
  }
}
