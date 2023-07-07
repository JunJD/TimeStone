import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
