import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLandingpageTestimonyDto } from './dto/create-landingpage-testimony.dto';
import { UpdateLandingpageTestimonyDto } from './dto/update-landingpage-testimony.dto';

@Injectable()
export class LandingpageTestimoniesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLandingpageTestimonyDto) {
    return this.prisma.landingpageTestimony.create({ data: dto });
  }

  async findAll() {
    return this.prisma.landingpageTestimony.findMany();
  }

  async findOne(id: string) {
    const testimony = await this.prisma.landingpageTestimony.findUnique({
      where: { id },
    });
    if (!testimony) throw new NotFoundException(`Testimony ${id} not found`);
    return testimony;
  }

  async update(id: string, dto: UpdateLandingpageTestimonyDto) {
    await this.findOne(id);
    return this.prisma.landingpageTestimony.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.landingpageTestimony.delete({ where: { id } });
  }
}
