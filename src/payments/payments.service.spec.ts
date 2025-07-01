/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const mockPrismaService = {
    payment: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: '1',
          orderId: '100',
          amount: 50000,
          status: 'completed',
          method: 'credit_card',
          paidAt: '2025-06-15T08:00:00Z',
        },
      ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === '1'
            ? {
                id: '1',
                orderId: '100',
                amount: 50000,
                status: 'completed',
                method: 'credit_card',
                paidAt: '2025-06-15T08:00:00Z',
              }
            : null,
        ),
      ),
      create: jest
        .fn()
        .mockImplementation((args) =>
          Promise.resolve({ id: '2', ...args.data }),
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
        PaymentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all payments', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: '1',
        orderId: '100',
        amount: 50000,
        status: 'completed',
        method: 'credit_card',
        paidAt: '2025-06-15T08:00:00Z',
      },
    ]);
  });

  it('should find one payment by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({
      id: '1',
      orderId: '100',
      amount: 50000,
      status: 'completed',
      method: 'credit_card',
      paidAt: '2025-06-15T08:00:00Z',
    });
  });

  it('should throw NotFoundException if payment not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new payment', async () => {
    const dto = {
      orderId: '101',
      amount: 75000,
      status: 'pending',
      method: 'bank_transfer',
      paidAt: '2025-06-16T10:00:00Z',
    };
    const result = await service.create(dto);
    expect(result).toEqual({ id: '2', ...dto });
  });

  it('should update a payment', async () => {
    const dto = {
      orderId: '100',
      amount: 50000,
      status: 'completed',
      method: 'credit_card',
      paidAt: '2025-06-15T08:00:00Z',
    };
    const result = await service.update('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('should delete a payment', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
