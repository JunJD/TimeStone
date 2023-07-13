import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/modules/user/common/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity()
export class File extends BaseEntity {
  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @Column()
  filename: string;

  @Column({
    select: false,
  })
  destname: string;

  @Column({
    select: false,
  })
  destination: string;

  @Column()
  type: string;

  @Column()
  size: number;

  @Column()
  hash: string;
}
