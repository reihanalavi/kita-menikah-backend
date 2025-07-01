/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageFaqsService } from './landingpage-faqs.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageFaqsService', () => {
  let service: LandingpageFaqsService;

  const mockPrismaService = {
    landingpageFaq: {
      findMany: jest
        .fn()
        .mockResolvedValue([{ id: '1', question: 'Q1', answer: 'A1' }]),
      findUnique: jest
        .fn()
        .mockImplementation(({ where: { id } }) =>
          Promise.resolve(
            id === '1' ? { id: '1', question: 'Q1', answer: 'A1' } : null,
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
        LandingpageFaqsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LandingpageFaqsService>(LandingpageFaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all faqs', async () => {
    const faqs = await service.findAll();
    expect(faqs).toEqual([{ id: '1', question: 'Q1', answer: 'A1' }]);
  });

  it('should find one faq by id', async () => {
    const faq = await service.findOne('1');
    expect(faq).toEqual({ id: '1', question: 'Q1', answer: 'A1' });
  });

  it('should throw NotFoundException if faq not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new faq', async () => {
    const dto = { question: 'Q2', answer: 'A2' };
    const faq = await service.create(dto);
    expect(faq).toEqual({ id: '2', ...dto });
  });

  it('should update an existing faq', async () => {
    const dto = { answer: 'Updated Answer' };
    const faq = await service.update('1', dto);
    expect(faq.answer).toBe('Updated Answer');
  });

  it('should remove a faq', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
