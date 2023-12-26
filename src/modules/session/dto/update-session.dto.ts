import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Favorite } from '../common/types/favorite.types';
import { Session } from '../common/entity/session.entity';

export class UpdateSessionDto {
  @IsNumber()
  readonly sessionId: Session['id'];

  @IsString()
  readonly title?: string;

  @IsEnum(Favorite)
  readonly favorite?: Favorite;
}
