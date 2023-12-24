import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../common/types/status';

export class CreateOrderDto {
  @IsNumber()
  readonly totalPrice: number;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus;

  @IsString()
  readonly tokenAmount: number;

  @IsString()
  readonly paymentMethod: string;

  @IsEnum(PaymentStatus)
  readonly paymentStatus: PaymentStatus;

  @IsDate()
  readonly paymentDate?: Date;

  @IsString()
  readonly subject?: string;
}
