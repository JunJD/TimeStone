import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/modules/user/common/entity/user.entity';
@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  orderDate: Date;

  @Column('float')
  totalPrice: number;

  @Column()
  status: string;

  @Column('float')
  tokenAmount: number;
}
