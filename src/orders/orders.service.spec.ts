/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;

  // Mock PrismaService yang sesuai pemanggilan Prisma di service
  const mockPrismaService = {
    order: {
      findMany: jest.fn().mockResolvedValue([{ id: '1', status: 'pending' }]),
      findUnique: jest
        .fn()
        .mockImplementation(({ where: { id } }) =>
          Promise.resolve(id === '1' ? { id: '1', status: 'pending' } : null),
        ),
      create: jest
        .fn()
        .mockImplementation(({ data }) =>
          Promise.resolve({ id: '2', ...data }),
        ),
      update: jest
        .fn()
        .mockImplementation(({ where: { id }, data }) =>
          Promise.resolve({ id, ...data }),
        ),
      delete: jest.fn().mockResolvedValue({ id: '1' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', async () => {
    const orders = await service.findAll();
    expect(orders).toEqual([{ id: '1', status: 'pending' }]);
  });

  it('should find one order by id', async () => {
    const order = await service.findOne('1');
    expect(order).toEqual({ id: '1', status: 'pending' });
  });

  it('should throw NotFoundException if order not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new order', async () => {
    const dto = { userId: 'u1', templateId: 't1', status: 'pending' };
    const order = await service.create(dto);
    expect(order).toEqual({ id: '2', ...dto });
  });

  it('should update an existing order', async () => {
    const dto = { status: 'paid' };
    const order = await service.update('1', dto);
    expect(order.status).toBe('paid');
  });

  it('should remove an order', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
