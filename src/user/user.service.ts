import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserProfile } from './return-profile.object';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...ReturnUserProfile,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async update(id: number, login: string, dto: UpdateUserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { login: login },
    });

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Логин занят');
    }

    const user = await this.getById(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        login: dto.login,
        fio: dto.fio,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async addPoint(userId: number, points: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        point: {
          increment: points,
        },
      },
    });
  }
}
