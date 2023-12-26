import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Assistant } from 'src/modules/assistant/common/entity/assistant.entity';
import { Favorite } from '../common/types/favorite.types';

export class CreateSessionDto {
  @IsNumber()
  readonly assistantId: Assistant['id'];

  @IsString()
  readonly title: string;

  @IsEnum(Favorite)
  readonly favorite: Favorite;
}
