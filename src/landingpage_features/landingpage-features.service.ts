import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLandingpageFeatureDto } from './dto/create-landingpage-feature.dto';
import { UpdateLandingpageFeatureDto } from './dto/update-landingpage-feature.dto';

@Injectable()
export class LandingpageFeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLandingpageFeatureDto) {
    return this.prisma.landingpageFeature.create({ data: dto });
  }

  async findAll() {
    return this.prisma.landingpageFeature.findMany();
  }

  async findOne(id: string) {
    const feature = await this.prisma.landingpageFeature.findUnique({
      where: { id },
    });
    if (!feature) throw new NotFoundException(`Feature ${id} not found`);
    return feature;
  }

  async update(id: string, dto: UpdateLandingpageFeatureDto) {
    await this.findOne(id);
    return this.prisma.landingpageFeature.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.landingpageFeature.delete({ where: { id } });
  }
}
