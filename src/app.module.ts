import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoModule } from './mo/mo.module';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CriterieModule } from './criterie/criterie.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MoModule,
    JwtModule.register({
      secret: 'sldjf$23jfoilsjfoiesij0(*)',
      signOptions: { expiresIn: '5m' },
    }),
    AuthModule,
    PostModule,
    CriterieModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
