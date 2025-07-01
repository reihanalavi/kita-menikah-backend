import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LandingpageFeaturesService } from './landingpage-features.service';
import { CreateLandingpageFeatureDto } from './dto/create-landingpage-feature.dto';
import { UpdateLandingpageFeatureDto } from './dto/update-landingpage-feature.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('landingpage-features')
export class LandingpageFeaturesController {
  constructor(private readonly featuresService: LandingpageFeaturesService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateLandingpageFeatureDto) {
    return this.featuresService.create(dto);
  }

  @Get()
  findAll() {
    return this.featuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  update(@Param('id') id: string, @Body() dto: UpdateLandingpageFeatureDto) {
    return this.featuresService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.featuresService.remove(id);
  }
}
