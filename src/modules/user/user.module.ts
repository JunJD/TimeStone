import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSetting } from './common/entity/setting.entity';
import { User } from './common/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
