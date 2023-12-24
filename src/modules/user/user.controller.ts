import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './common/entity/user.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // @Roles(UserRole.ADMIN)
  @Post('profile')
  getProfile(
    @Body() findUserDto: Pick<CreateUserDto, 'email'>,
  ): Promise<User | undefined> {
    return this.userService.findOne(findUserDto);
  }
}
