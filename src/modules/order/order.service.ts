import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './common/entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateOrderId } from 'src/utils/uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();

    order.totalPrice = createOrderDto.totalPrice;
    order.status = createOrderDto.status;
    order.tokenAmount = createOrderDto.tokenAmount;
    order.paymentMethod = createOrderDto.paymentMethod;
    order.paymentStatus = createOrderDto.paymentStatus;
    order.paymentDate = createOrderDto?.paymentDate;
    order.orderId = generateOrderId();
    order.subject =
      createOrderDto.subject ?? `支付购买${createOrderDto.tokenAmount}token`;
    order.user = createOrderDto.user;
    return await this.orderRepo.save(order);
  }

  async updateOrder(
    id: number,
    updateData: Partial<Order>,
  ): Promise<UpdateResult> {
    const update = await this.orderRepo.update(id, updateData);
    return update;
  }

  async findOne(findOrderDto: { id: number }): Promise<Order | undefined> {
    return await this.orderRepo.findOne({
      where: { id: findOrderDto.id },
      select: ['status', 'tokenAmount', 'totalPrice', 'orderId'],
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepo.find();
  }
}
