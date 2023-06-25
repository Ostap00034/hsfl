import { Module } from '@nestjs/common';
import { CriterieService } from './criterie.service';
import { CriterieController } from './criterie.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [CriterieController],
  providers: [CriterieService, PrismaService],
  exports: [CriterieService],
})
export class CriterieModule {}
