import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录 生成token
  async signIn(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(
      loginAuthDto as Pick<LoginAuthDto, 'email'>,
    );

    if (user === null) {
      throw new HttpException('用户不存在', 401);
    }

    console.log(loginAuthDto.password, user);

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
