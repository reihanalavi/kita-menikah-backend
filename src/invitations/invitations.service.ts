import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInvitationDto) {
    return this.prisma.invitation.create({ data: dto });
  }

  async findAll() {
    return this.prisma.invitation.findMany({ include: { order: true } });
  }

  async findOne(id: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id },
      include: { order: true },
    });
    if (!invitation) throw new NotFoundException(`Invitation ${id} not found`);
    return invitation;
  }

  async update(id: string, dto: UpdateInvitationDto) {
    await this.findOne(id);
    return this.prisma.invitation.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.invitation.delete({ where: { id } });
  }
}
