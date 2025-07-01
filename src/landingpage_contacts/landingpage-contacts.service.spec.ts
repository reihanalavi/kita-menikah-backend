/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageContactsService } from './landingpage-contacts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageContactsService', () => {
  let service: LandingpageContactsService;

  const mockPrismaService = {
    landingpageContact: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: '1',
          label: 'Email',
          value: 'test@example.com',
          icon: 'email-icon',
        },
      ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === '1'
            ? {
                id: '1',
                label: 'Email',
                value: 'test@example.com',
                icon: 'email-icon',
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
        LandingpageContactsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LandingpageContactsService>(
      LandingpageContactsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all contacts', async () => {
    const contacts = await service.findAll();
    expect(contacts).toEqual([
      {
        id: '1',
        label: 'Email',
        value: 'test@example.com',
        icon: 'email-icon',
      },
    ]);
  });

  it('should find one contact by id', async () => {
    const contact = await service.findOne('1');
    expect(contact).toEqual({
      id: '1',
      label: 'Email',
      value: 'test@example.com',
      icon: 'email-icon',
    });
  });

  it('should throw NotFoundException if contact not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should create a new contact', async () => {
    const dto = {
      label: 'Whatsapp',
      value: '0812345678',
      icon: 'whatsapp-icon',
    };
    const contact = await service.create(dto);
    expect(contact).toEqual({ id: '2', ...dto });
  });

  it('should update an existing contact', async () => {
    const dto = { label: 'Telegram' };
    const contact = await service.update('1', dto);
    expect(contact).toEqual({ id: '1', ...dto });
  });

  it('should remove a contact', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ id: '1' });
  });
});
