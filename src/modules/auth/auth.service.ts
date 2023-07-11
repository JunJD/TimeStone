import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 注册依然返回token
  async signUp(createUserDto: CreateUserDto) {
    const _user = await this.userService.findOne(
      createUserDto as Pick<CreateUserDto, 'email'>,
    );
    if (_user) {
      throw new HttpException('用户已存在', 401);
    }
    const user = await this.userService.createUser(createUserDto);

    const payload = { username: user?.email, sub: user?.name };

    return {
      ...payload,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  // 登录 生成token
  async signIn(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(
      loginAuthDto as Pick<LoginAuthDto, 'email'>,
    );

    if (user === null) {
      throw new HttpException('用户不存在', 401);
    }

    if (user?.password !== loginAuthDto.password) {
      throw new HttpException('密码错误', 401);
    }

    const payload = { username: user.email, sub: user.name };

    return {
      ...payload,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
