import { Post, Controller, Body, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/common/entity/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

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

  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto): Promise<User> {
    const user = await this.userService.findOne(
      loginAuthDto as Pick<LoginAuthDto, 'email'>,
    );
    if (!user) {
      throw new HttpException('用户不存在', 401);
    }
    return user;
    // return this.userService.createUser(createUserDto);
  }
}
