import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-templates.dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.template.findMany();
  }

  async findOne(id: string) {
    return this.prisma.template.findUnique({ where: { id } });
  }

  async create(data: CreateTemplateDto) {
    return this.prisma.template.create({ data });
  }

  async update(id: string, data: Partial<CreateTemplateDto>) {
    return this.prisma.template.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.template.delete({ where: { id } });
  }
}
