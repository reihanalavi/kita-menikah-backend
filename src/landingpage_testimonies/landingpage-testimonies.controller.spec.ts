/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageTestimoniesController } from './landingpage-testimonies.controller';
import { LandingpageTestimoniesService } from './landingpage-testimonies.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageTestimoniesController', () => {
  let controller: LandingpageTestimoniesController;
  let service: LandingpageTestimoniesService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: '1', name: 'John Doe', message: 'ok', avatarUrl: 'url' },
      ]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            name: 'John Doe',
            message: 'ok',
            avatarUrl: 'url',
          })
        : Promise.reject(new NotFoundException()),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingpageTestimoniesController],
      providers: [
        { provide: LandingpageTestimoniesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<LandingpageTestimoniesController>(
      LandingpageTestimoniesController,
    );
    service = module.get<LandingpageTestimoniesService>(
      LandingpageTestimoniesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a testimony', async () => {
    const dto = {
      name: 'Jane Doe',
      message: 'Great!',
      avatarUrl: 'avatar.jpg',
    };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all testimonies', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: '1', name: 'John Doe', message: 'ok', avatarUrl: 'url' },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should find one testimony by id', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      name: 'John Doe',
      message: 'ok',
      avatarUrl: 'url',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if testimony not found', async () => {
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should update a testimony', async () => {
    const dto = {
      name: 'Updated',
      message: 'Updated msg',
      avatarUrl: 'avatar2.jpg',
    };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a testimony', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
