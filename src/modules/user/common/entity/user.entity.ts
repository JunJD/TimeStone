import { Column, Entity } from 'typeorm';
import { UserSetting } from './setting.entity';
import { BaseEntity } from 'src/common/base.entity';
@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column()
  openId: string;

  // @Column({
  //   default: UserRole.user,
  //   enum: UserRole,
  // })
  // role: UserRole;

  userSettingList: UserSetting[];
}
