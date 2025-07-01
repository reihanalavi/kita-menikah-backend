/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageTestimoniesService } from './landingpage-testimonies.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageTestimoniesService', () => {
  let service: LandingpageTestimoniesService;

  const mockPrismaService = {
    landingpageTestimony: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'John Doe',
          message: 'ok',
          avatarUrl: 'image-url',
        },
      ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === '1'
            ? {
                id: '1',
                name: 'John Doe', // ✅ ini penting!
                message: 'ok',
                avatarUrl: 'image-url',
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
        LandingpageTestimoniesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LandingpageTestimoniesService>(
      LandingpageTestimoniesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all testimonies', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: '1',
        name: 'John Doe',
        message: 'ok',
        avatarUrl: 'image-url',
      },
    ]);
  });

  it('should find one testimony by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      message: 'ok',
      avatarUrl: 'image-url',
    });
  });

  it('should throw NotFoundException if testimony not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new testimony', async () => {
    const dto = {
      name: 'Jane Smith',
      message: 'ok',
      avatarUrl: 'image-url',
    };
    const result = await service.create(dto);
    expect(result).toEqual({ id: '2', ...dto });
  });

  it('should update a testimony', async () => {
    const dto = {
      name: 'John Updated',
      message: 'ok',
      avatarUrl: 'image-url',
    };
    const result = await service.update('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('should delete a testimony', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
