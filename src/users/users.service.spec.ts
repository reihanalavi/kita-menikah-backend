/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  // Mock PrismaService khusus untuk user
  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 'u1',
          email: 'user1@example.com',
          name: 'User One',
          role: 'admin',
        },
      ]),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) =>
        Promise.resolve(
          id === 'u1'
            ? {
                id: 'u1',
                email: 'user1@example.com',
                name: 'User One',
                role: 'admin',
              }
            : null,
        ),
      ),
      create: jest
        .fn()
        .mockImplementation(({ data }) =>
          Promise.resolve({ id: 'u2', ...data }),
        ),
      update: jest
        .fn()
        .mockImplementation(({ where: { id }, data }) =>
          Promise.resolve({ id, ...data }),
        ),
      delete: jest.fn().mockResolvedValue({ id: 'u1' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([
      { id: 'u1', email: 'user1@example.com', name: 'User One', role: 'admin' },
    ]);
  });

  it('should find one user by id', async () => {
    const user = await service.findOne('u1');
    expect(user).toEqual({
      id: 'u1',
      email: 'user1@example.com',
      name: 'User One',
      role: 'admin',
    });
  });

  it('should throw NotFoundException if user not found', async () => {
    await expect(service.findOne('unknown')).rejects.toThrow(NotFoundException);
  });

  it('should create a new user', async () => {
    const dto = {
      email: 'user2@example.com',
      name: 'User Two',
      role: 'member',
    };
    const user = await service.create(dto);
    expect(user).toEqual({ id: 'u2', ...dto });
  });

  it('should update an existing user', async () => {
    const dto = { name: 'Updated Name' };
    const user = await service.update('u1', dto);
    expect(user.name).toBe('Updated Name');
  });

  it('should remove a user', async () => {
    const result = await service.remove('u1');
    expect(result).toEqual({ id: 'u1' });
  });
});
