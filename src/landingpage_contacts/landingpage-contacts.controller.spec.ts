/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LandingpageContactsController } from './landingpage-contacts.controller';
import { LandingpageContactsService } from './landingpage-contacts.service';
import { NotFoundException } from '@nestjs/common';

describe('LandingpageContactsController', () => {
  let controller: LandingpageContactsController;
  let service: LandingpageContactsService;

  const mockService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        { id: '1', label: 'Email', value: 'email@example.com', icon: 'mail' },
      ]),
    ),
    findOne: jest.fn((id) =>
      id === '1'
        ? Promise.resolve({
            id: '1',
            label: 'Email',
            value: 'email@example.com',
            icon: 'mail',
          })
        : Promise.reject(new NotFoundException()),
    ),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingpageContactsController],
      providers: [
        { provide: LandingpageContactsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<LandingpageContactsController>(
      LandingpageContactsController,
    );
    service = module.get<LandingpageContactsService>(
      LandingpageContactsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a contact', async () => {
    const dto = { label: 'Phone', value: '+123456789', icon: 'phone' };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', ...dto });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all contacts', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: '1', label: 'Email', value: 'email@example.com', icon: 'mail' },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should find one contact by id', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({
      id: '1',
      label: 'Email',
      value: 'email@example.com',
      icon: 'mail',
    });
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if contact not found', async () => {
    await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    expect(mockService.findOne).toHaveBeenCalledWith('99');
  });

  it('should update a contact', async () => {
    const dto = {
      label: 'Updated Label',
      value: 'Updated Value',
      icon: 'updated-icon',
    };
    await expect(controller.update('1', dto)).resolves.toEqual({
      id: '1',
      ...dto,
    });
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a contact', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ id: '1' });
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
