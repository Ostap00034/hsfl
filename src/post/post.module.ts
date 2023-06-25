import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CategoryModule } from 'src/category/category.module';
import { CriterieModule } from 'src/criterie/criterie.module';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CategoryModule, CriterieModule, UserModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
