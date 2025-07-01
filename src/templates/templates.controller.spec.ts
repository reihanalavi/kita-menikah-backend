/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from './templates.controller';
import { TemplateService } from './templates.service';
import { NotFoundException } from '@nestjs/common';

describe('TemplateController', () => {
  let controller: TemplateController;
  let service: TemplateService;

  const mockService = {
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          name: 'Template One',
          price: 100,
          previewUrl: 'http://example.com/1',
        },
      ]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            name: 'Template One',
            price: 100,
            previewUrl: 'http://example.com/1',
          })
        : Promise.reject(new NotFoundException()),
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [{ provide: TemplateService, useValue: mockService }],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all templates', async () => {
    await expect(controller.getAll()).resolves.toEqual([
      {
        id: '1',
        name: 'Template One',
        price: 100,
        previewUrl: 'http://example.com/1',
      },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should return one template by id', async () => {
    await expect(controller.getOne('1')).resolves.toEqual({
      id: '1',
      name: 'Template One',
      price: 100,
      previewUrl: 'http://example.com/1',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if template not found', async () => {
    await expect(controller.getOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should create a new template', async () => {
    const dto = {
      name: 'New Template',
      price: 200,
      previewUrl: 'http://example.com/new',
    };
    await expect(controller.create(dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a template', async () => {
    const dto = { name: 'Updated Template', price: 250 };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a template', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
