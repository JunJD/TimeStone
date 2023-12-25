import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Assistant } from 'src/modules/assistant/common/entity/assistant.entity';
import { Favorite } from '../types/favorite.types';

@Entity()
export class Session extends BaseEntity {
  @ManyToOne(() => Assistant, (assistant) => assistant.sessions)
  assistant: Assistant;

  @Column({ default: '默认标题' })
  title: string;

  /**0未收藏 1收藏 */
  @Column({ default: Favorite.False })
  favorite: Favorite;

  //   @OneToMany(() => Message, message => message.session)
  //   messages: Message[];
}
