import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LandingpageFaqsService } from './landingpage-faqs.service';
import { CreateLandingpageFaqDto } from './dto/create-landingpage-faq.dto';
import { UpdateLandingpageFaqDto } from './dto/update-landingpage-faq.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('landingpage-faqs')
export class LandingpageFaqsController {
  constructor(private readonly service: LandingpageFaqsService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  create(@Body() dto: CreateLandingpageFaqDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  update(@Param('id') id: string, @Body() dto: UpdateLandingpageFaqDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
