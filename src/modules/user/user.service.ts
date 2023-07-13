import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSetting } from './common/entity/setting.entity';
import { User } from './common/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserSetting)
    private readonly settingRepo: Repository<UserSetting>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name ?? '-';
    user.openId = '-';
    const hashPassword = await this.generatePassword(createUserDto.password);
    console.log(hashPassword);
    user.password = hashPassword;
    return await this.userRepo.save(user);
  }

  async findOne(
    findUserDto: Pick<CreateUserDto, 'email'>,
  ): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: { email: findUserDto.email },
      select: ['password', 'email', 'name'],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async generatePassword(passwd: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(passwd, saltOrRounds);
  }
}
