import { Column, Entity, OneToMany } from 'typeorm';
import { UserSetting } from './setting.entity';
import { BaseEntity } from 'src/common/base.entity';
import { File } from 'src/modules/file/common/entity/file.entity';
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
  @OneToMany(() => File, (file) => file.user)
  files: File[];

  userSettingList: UserSetting[];
}
