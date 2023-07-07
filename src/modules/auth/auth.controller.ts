import { Post, Controller, Body, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/common/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.findOne(
      createUserDto as Pick<CreateUserDto, 'email'>,
    );
    if (user) {
      throw new HttpException('用户已存在', 401);
    }
    return this.userService.createUser(createUserDto);
  }
}
