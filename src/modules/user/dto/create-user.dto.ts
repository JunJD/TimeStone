import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  readonly password: string;
}
