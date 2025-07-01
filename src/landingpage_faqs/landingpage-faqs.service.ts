import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLandingpageFaqDto } from './dto/create-landingpage-faq.dto';
import { UpdateLandingpageFaqDto } from './dto/update-landingpage-faq.dto';

@Injectable()
export class LandingpageFaqsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLandingpageFaqDto) {
    return this.prisma.landingpageFaq.create({ data: dto });
  }

  async findAll() {
    return this.prisma.landingpageFaq.findMany();
  }

  async findOne(id: string) {
    const faq = await this.prisma.landingpageFaq.findUnique({
      where: { id },
    });
    if (!faq) throw new NotFoundException(`FAQ ${id} not found`);
    return faq;
  }

  async update(id: string, dto: UpdateLandingpageFaqDto) {
    await this.findOne(id);
    return this.prisma.landingpageFaq.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.landingpageFaq.delete({ where: { id } });
  }
}
