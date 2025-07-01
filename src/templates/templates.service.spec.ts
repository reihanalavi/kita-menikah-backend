/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './templates.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TemplateService', () => {
  let service: TemplateService;

  const mockPrismaService = {
    template: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: 't1', name: 'Template 1', price: 100, previewUrl: 'url1' },
        ]),
      findUnique: jest
        .fn()
        .mockImplementation(({ where: { id } }) =>
          Promise.resolve(
            id === 't1'
              ? { id: 't1', name: 'Template 1', price: 100, previewUrl: 'url1' }
              : null,
          ),
        ),
      create: jest
        .fn()
        .mockImplementation(({ data }) =>
          Promise.resolve({ id: 't2', ...data }),
        ),
      update: jest
        .fn()
        .mockImplementation(({ where: { id }, data }) =>
          Promise.resolve({ id, ...data }),
        ),
      delete: jest.fn().mockResolvedValue({ id: 't1' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all templates', async () => {
    const templates = await service.findAll();
    expect(templates).toEqual([
      { id: 't1', name: 'Template 1', price: 100, previewUrl: 'url1' },
    ]);
  });

  it('should find one template by id', async () => {
    const template = await service.findOne('t1');
    expect(template).toEqual({
      id: 't1',
      name: 'Template 1',
      price: 100,
      previewUrl: 'url1',
    });
  });

  it('should create a new template', async () => {
    const dto = { name: 'Template 2', price: 200, previewUrl: 'url2' };
    const template = await service.create(dto);
    expect(template).toEqual({ id: 't2', ...dto });
  });

  it('should update an existing template', async () => {
    const dto = { name: 'Updated Template', price: 300 };
    const template = await service.update('t1', dto);
    expect(template.name).toBe('Updated Template');
    expect(template.price).toBe(300);
  });

  it('should remove a template', async () => {
    const result = await service.remove('t1');
    expect(result).toEqual({ id: 't1' });
  });
});
