/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsService } from './invitations.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('InvitationsService', () => {
  let service: InvitationsService;

  const mockPrismaService = {
    invitation: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: '1',
          orderId: '100',
          slug: 'some-slug',
          publicUrl: 'https://example.com/invitation/1',
          order: {
            id: '100',
            email: 'buyer@example.com',
          },
        },
      ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === '1'
            ? {
                id: '1',
                orderId: '100',
                slug: 'some-slug',
                publicUrl: 'https://example.com/invitation/1',
                order: {
                  id: '100',
                  email: 'buyer@example.com',
                },
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
        InvitationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<InvitationsService>(InvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all invitations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: '1',
        orderId: '100',
        slug: 'some-slug',
        publicUrl: 'https://example.com/invitation/1',
        order: {
          id: '100',
          email: 'buyer@example.com',
        },
      },
    ]);
  });

  it('should find one invitation by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({
      id: '1',
      orderId: '100',
      slug: 'some-slug',
      publicUrl: 'https://example.com/invitation/1',
      order: {
        id: '100',
        email: 'buyer@example.com',
      },
    });
  });

  it('should throw NotFoundException if invitation not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new invitation', async () => {
    const dto = {
      orderId: '101',
      slug: 'new-slug',
      publicUrl: 'https://example.com/invitation/2',
    };
    const result = await service.create(dto);
    expect(result).toEqual({ id: '2', ...dto });
  });

  it('should update an invitation', async () => {
    const dto = {
      orderId: '100',
      slug: 'updated-slug',
      publicUrl: 'https://example.com/invitation/1-updated',
    };
    const result = await service.update('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('should delete an invitation', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
