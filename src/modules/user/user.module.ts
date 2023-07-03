import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './common/user.entity';
import { UserService } from './user.service';
import { UserSetting } from './common/setting.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
