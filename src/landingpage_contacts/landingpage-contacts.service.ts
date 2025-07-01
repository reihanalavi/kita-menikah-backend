import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLandingpageContactDto } from './dto/create-landingpage-contact.dto';
import { UpdateLandingpageContactDto } from './dto/update-landingpage-contact.dto';

@Injectable()
export class LandingpageContactsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLandingpageContactDto) {
    return this.prisma.landingpageContact.create({ data: dto });
  }

  async findAll() {
    return this.prisma.landingpageContact.findMany();
  }

  async findOne(id: string) {
    const contact = await this.prisma.landingpageContact.findUnique({
      where: { id },
    });
    if (!contact) throw new NotFoundException(`Contact ${id} not found`);
    return contact;
  }

  async update(id: string, dto: UpdateLandingpageContactDto) {
    await this.findOne(id);
    return this.prisma.landingpageContact.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.landingpageContact.delete({ where: { id } });
  }
}
