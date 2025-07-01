/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageFeaturesController } from './landingpage-features.controller';
import { LandingpageFeaturesService } from './landingpage-features.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageFeaturesController', () => {
  let controller: LandingpageFeaturesController;
  let service: LandingpageFeaturesService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: '1', icon: 'icon1', title: 'Title 1', description: 'Desc 1' },
      ]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            icon: 'icon1',
            title: 'Title 1',
            description: 'Desc 1',
          })
        : Promise.reject(new NotFoundException()),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingpageFeaturesController],
      providers: [
        { provide: LandingpageFeaturesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<LandingpageFeaturesController>(
      LandingpageFeaturesController,
    );
    service = module.get<LandingpageFeaturesService>(
      LandingpageFeaturesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a feature', async () => {
    const dto = { icon: 'icon2', title: 'New Title', description: 'New Desc' };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all features', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: '1', icon: 'icon1', title: 'Title 1', description: 'Desc 1' },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should find one feature by id', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      icon: 'icon1',
      title: 'Title 1',
      description: 'Desc 1',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if feature not found', async () => {
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should update a feature', async () => {
    const dto = {
      icon: 'icon3',
      title: 'Updated Title',
      description: 'Updated Desc',
    };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a feature', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
