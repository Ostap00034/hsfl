import { Module } from '@nestjs/common';
import { MoService } from './mo.service';
import { MoController } from './mo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MoController],
  providers: [MoService, PrismaService],
  exports: [MoService],
})
export class MoModule {}
