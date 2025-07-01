import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // biar PrismaService bisa diinject di semua module tanpa perlu import PrismaModule berulang
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
