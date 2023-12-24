import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly totalPrice: number;

  @IsString()
  readonly status: string;

  @IsString()
  readonly tokenAmount: number;
}
