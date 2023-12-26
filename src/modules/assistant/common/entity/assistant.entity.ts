import { User } from 'src/modules/user/common/entity/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Session } from 'src/modules/session/common/entity/session.entity';

@Entity()
export class Assistant extends BaseEntity {
  @ManyToOne(() => User, (user) => user.assistants)
  user: User;

  @Column({ default: '暂无描述' })
  description: string;

  @Column()
  tags: string;

  @Column({ default: '👨‍💻' })
  avatar: string;

  @Column({ default: '-' })
  title: string;

  @Column({ default: '' })
  systemRole: string;

  @Column({ default: 'gpt-3.5-turbo-16k' })
  model: string;

  @Column({ default: true })
  isPublic: boolean;

  @OneToMany(() => Session, (session) => session.assistant)
  sessions: Session[];
}
