import { Column, Entity } from 'typeorm';
import { UserSetting } from './setting.entity';
import { BaseEntity } from 'src/common/base.entity';
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

  // @Column({
  //   default: UserRole.user,
  //   enum: UserRole,
  // })
  // role: UserRole;

  userSettingList: UserSetting[];
}
