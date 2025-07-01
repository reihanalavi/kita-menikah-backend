/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    const requester = req.user;
    if (requester.role !== 'Superadmin' && requester.id !== id) {
      throw new ForbiddenException(
        'You are not allowed to access this user data',
      );
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req,
  ) {
    const requester = req.user;
    if (requester.role !== 'Superadmin' && requester.id !== id) {
      throw new ForbiddenException(
        'You are not allowed to update this user data',
      );
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Superadmin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
