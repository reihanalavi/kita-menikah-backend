/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

describe('InvitationsController', () => {
  let controller: InvitationsController;
  let service: InvitationsService;

  const mockInvitation = {
    id: '1',
    orderId: 'order-123',
    slug: 'invitation-slug',
    publicUrl: 'http://example.com/invite/slug',
  };

  const mockInvitationsService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findAll: jest.fn(() => Promise.resolve([mockInvitation])),
    findOne: jest.fn((id) => Promise.resolve({ ...mockInvitation, id })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn((id) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationsController],
      providers: [
        {
          provide: InvitationsService,
          useValue: mockInvitationsService,
        },
      ],
    }).compile();

    controller = module.get<InvitationsController>(InvitationsController);
    service = module.get<InvitationsService>(InvitationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new invitation', async () => {
      const dto: CreateInvitationDto = {
        orderId: 'order-123',
        slug: 'invitation-slug',
        publicUrl: 'http://example.com/invite/slug',
      };

      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of invitations', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockInvitation]);
    });
  });

  describe('findOne', () => {
    it('should return a single invitation', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({ ...mockInvitation, id });
    });
  });

  describe('update', () => {
    it('should update an invitation', async () => {
      const id = '1';
      const dto = {
        slug: 'updated-slug',
        publicUrl: 'http://updated.url',
        orderId: 'order-123',
      };
      const result = await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({ id, ...dto });
    });
  });

  describe('remove', () => {
    it('should remove an invitation', async () => {
      const id = '1';
      const result = await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id });
    });
  });
});
