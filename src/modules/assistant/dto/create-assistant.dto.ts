import { IsArray, IsBoolean, IsString } from 'class-validator';
import { Tag } from '../common/types/tag.types';

export class CreateAssistantDto {
  @IsBoolean()
  readonly isPublic: boolean;

  @IsString()
  readonly model: string;

  @IsString()
  readonly systemRole: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly avatar: string;

  @IsArray()
  readonly tags: Array<Tag>;
}
