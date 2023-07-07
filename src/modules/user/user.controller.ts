import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<string> {
    return this.userService.getHello();
  }
  @Post('register')
  SignIn(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }
}
