/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageFeaturesService } from './landingpage-features.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageFeaturesService', () => {
  let service: LandingpageFeaturesService;

  const mockPrismaService = {
    landingpageFeature: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: '1', icon: 'icon-1', title: 'Title 1', description: 'Desc 1' },
        ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === '1'
            ? {
                id: '1',
                icon: 'icon-1',
                title: 'Title 1',
                description: 'Desc 1',
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
        LandingpageFeaturesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LandingpageFeaturesService>(
      LandingpageFeaturesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all features', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: '1', icon: 'icon-1', title: 'Title 1', description: 'Desc 1' },
    ]);
  });

  it('should find one feature by id', async () => {
    const feature = await service.findOne('1');
    expect(feature).toEqual({
      id: '1',
      icon: 'icon-1',
      title: 'Title 1',
      description: 'Desc 1',
    });
  });

  it('should throw NotFoundException if feature not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new feature', async () => {
    const dto = {
      icon: 'icon-2',
      title: 'Title 2',
      description: 'Desc 2',
    };
    const feature = await service.create(dto);
    expect(feature).toEqual({ id: '2', ...dto });
  });

  it('should update an existing feature', async () => {
    const dto = {
      icon: 'icon-updated',
      title: 'Title Updated',
      description: 'Desc Updated',
    };
    const feature = await service.update('1', dto);
    expect(feature).toEqual({ id: '1', ...dto });
  });

  it('should delete a feature', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
