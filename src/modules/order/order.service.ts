import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './common/entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly userRepo: Repository<Order>,
  ) {}

  async createUser(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();

    order.totalPrice = createOrderDto.totalPrice;
    order.status = createOrderDto.status;
    order.tokenAmount = createOrderDto.tokenAmount;

    return await this.userRepo.save(order);
  }

  async findOne(findUserDto: { id: number }): Promise<Order | undefined> {
    return await this.userRepo.findOne({
      where: { id: findUserDto.id },
      select: ['id', 'status', 'tokenAmount', 'totalPrice'],
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.userRepo.find();
  }
}
