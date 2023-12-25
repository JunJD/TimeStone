import { Column, Entity, OneToMany } from 'typeorm';
import { UserSetting } from './setting.entity';
import { BaseEntity } from 'src/common/base.entity';
import { File } from 'src/modules/file/common/entity/file.entity';
import { Order } from 'src/modules/order/common/entity/order.entity';
import { Assistant } from 'src/modules/assistant/common/entity/assistant.entity';
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

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  userSettingList: UserSetting[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Assistant, (assistant) => assistant.user)
  assistants: Assistant[];

  @Column({ type: 'float', default: 0 })
  tokenBalance: number;
}
