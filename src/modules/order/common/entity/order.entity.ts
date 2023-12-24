import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/modules/user/common/entity/user.entity';
import { OrderStatus, PaymentStatus } from '../types/status';
@Entity()
export class Order extends BaseEntity {
  @Column()
  orderId: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @CreateDateColumn({
    transformer: {
      to: (value) => (value ? value : new Date()),
      from: (value) =>
        typeof value === 'number' ? value : Math.trunc(value.getTime() / 1000),
    },
  })
  orderDate: number;

  @Column('float')
  totalPrice: number;

  // 使用枚举类型
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Column('float')
  tokenAmount: number;

  @Column()
  paymentMethod: string;

  // 使用枚举类型
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: PaymentStatus.Pending,
  })

  // 使用枚举类型
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  paymentStatus: PaymentStatus;

  @Column()
  @Column({ type: 'date', nullable: true })
  paymentDate?: Date;
}
