/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageFaqsController } from './landingpage-faqs.controller';
import { LandingpageFaqsService } from './landingpage-faqs.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageFaqsController', () => {
  let controller: LandingpageFaqsController;
  let service: LandingpageFaqsService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([{ id: '1', question: 'What is X?', answer: 'X is...' }]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            question: 'What is X?',
            answer: 'X is...',
          })
        : Promise.reject(new NotFoundException()),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingpageFaqsController],
      providers: [{ provide: LandingpageFaqsService, useValue: mockService }],
    }).compile();

    controller = module.get<LandingpageFaqsController>(
      LandingpageFaqsController,
    );
    service = module.get<LandingpageFaqsService>(LandingpageFaqsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a faq', async () => {
    const dto = { question: 'What is Y?', answer: 'Y is...' };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all faqs', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: '1', question: 'What is X?', answer: 'X is...' },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should find one faq by id', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      question: 'What is X?',
      answer: 'X is...',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if faq not found', async () => {
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should update a faq', async () => {
    const dto = { question: 'Updated?', answer: 'Updated answer.' };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a faq', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
