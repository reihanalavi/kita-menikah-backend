/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          orderId: 'order1',
          amount: 100,
          status: 'pending',
          method: 'credit_card',
          paidAt: '2025-06-15T12:00:00.000Z',
        },
      ]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            orderId: 'order1',
            amount: 100,
            status: 'pending',
            method: 'credit_card',
            paidAt: '2025-06-15T12:00:00.000Z',
          })
        : Promise.reject(new NotFoundException()),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{ provide: PaymentsService, useValue: mockService }],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', async () => {
    const dto = {
      orderId: 'order1',
      amount: 100,
      status: 'pending',
      method: 'credit_card',
      paidAt: '2025-06-15T12:00:00.000Z',
    };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all payments', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      {
        id: '1',
        orderId: 'order1',
        amount: 100,
        status: 'pending',
        method: 'credit_card',
        paidAt: '2025-06-15T12:00:00.000Z',
      },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should return one payment by id', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      orderId: 'order1',
      amount: 100,
      status: 'pending',
      method: 'credit_card',
      paidAt: '2025-06-15T12:00:00.000Z',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if payment not found', async () => {
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should update a payment', async () => {
    const dto = { status: 'completed' };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a payment', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
