import { IsNumber, IsString } from 'class-validator';

export class AliPayDto {
  @IsNumber()
  readonly totalAmount: number;

  @IsString()
  readonly subject: string;

  @IsNumber()
  readonly tokenAmount: number;
}
