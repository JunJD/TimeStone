import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants';
// 创建自定义装饰器 @Public()
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 创建自定义装饰器 @Roles(UserRole)
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
