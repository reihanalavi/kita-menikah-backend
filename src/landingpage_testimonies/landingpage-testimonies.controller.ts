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
import { LandingpageTestimoniesService } from './landingpage-testimonies.service';
import { CreateLandingpageTestimonyDto } from './dto/create-landingpage-testimony.dto';
import { UpdateLandingpageTestimonyDto } from './dto/update-landingpage-testimony.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('landingpage-testimonies')
export class LandingpageTestimoniesController {
  constructor(private readonly service: LandingpageTestimoniesService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  create(@Body() dto: CreateLandingpageTestimonyDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateLandingpageTestimonyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
