import { Module } from '@nestjs/common';
import { TemplateService } from './templates.service';
import { TemplateController } from './templates.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, PrismaService],
})
export class TemplateModule {}
