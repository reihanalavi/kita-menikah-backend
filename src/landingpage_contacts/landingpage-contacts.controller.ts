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
import { LandingpageContactsService } from './landingpage-contacts.service';
import { CreateLandingpageContactDto } from './dto/create-landingpage-contact.dto';
import { UpdateLandingpageContactDto } from './dto/update-landingpage-contact.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('landingpage-contacts')
export class LandingpageContactsController {
  constructor(private readonly service: LandingpageContactsService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  create(@Body() dto: CreateLandingpageContactDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateLandingpageContactDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
