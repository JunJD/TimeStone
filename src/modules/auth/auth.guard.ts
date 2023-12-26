import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRole, jwtConstants } from './constants';
import { IS_PUBLIC_KEY, ROLES_KEY } from './decorators/public.decorator';
import { payloadDev } from './common/local';

// 用于验证请求的守卫
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  // 重写canActivate方法
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (process.env.NODE_ENV === 'development') {
      // 开发环境
      request['user'] = payloadDev;
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException('未授权', 401);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 这里我们将负载分配给请求对象
      // 这样我们可以在我们的路由处理程序中访问它
      request['user'] = payload;
    } catch {
      throw new HttpException('未授权', 401);
    }
    return true;
  }

  // 从请求头中提取token
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    console.log('requiredRoles==>', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user==>', user);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
