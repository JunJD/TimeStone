import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { UserSetting } from './setting.entity';
import { UserRole } from './user.type';
@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    generated: 'uuid',
  })
  openId: string;

  @Column({
    default: UserRole.user,
    enum: UserRole,
  })
  role: UserRole;

  userSettingList: UserSetting[];
}
