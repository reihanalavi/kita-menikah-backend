import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TemplateService } from './templates.service';
import { CreateTemplateDto } from './dto/create-templates.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  getAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  create(@Body() data: CreateTemplateDto) {
    return this.templateService.create(data);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  update(@Param('id') id: string, @Body() data: Partial<CreateTemplateDto>) {
    return this.templateService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
