import { IsDate, IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../common/types/status';
import { User } from 'src/modules/user/common/entity/user.entity';

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

  @IsObject()
  readonly user: User;
}
