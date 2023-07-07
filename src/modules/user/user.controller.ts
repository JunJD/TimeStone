import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
