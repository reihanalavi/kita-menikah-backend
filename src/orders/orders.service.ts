import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Pastikan data order ada dulu
    await this.findOne(id);

    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    // Pastikan data order ada dulu
    await this.findOne(id);

    return this.prisma.order.delete({
      where: { id },
    });
  }
}
