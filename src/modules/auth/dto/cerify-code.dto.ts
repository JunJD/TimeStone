import { IsEmail, IsOptional, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly code: string;

  @IsString()
  @IsOptional()
  readonly name: string;
}
