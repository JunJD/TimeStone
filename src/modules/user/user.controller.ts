import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './common/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('profile')
  getProfile(
    @Body() findUserDto: Pick<CreateUserDto, 'email'>,
  ): Promise<User | undefined> {
    return this.userService.findOne(findUserDto);
  }

  @Post('register')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getProfile(createUserDto);
    if (user) {
      throw new HttpException('用户已存在', 401);
    }
    return this.userService.createUser(createUserDto);
  }
}
