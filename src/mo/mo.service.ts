import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateMoDto } from './dto/update-mo.dto';
import { CreateMoDto } from './dto/create-mo.dto';

@Injectable()
export class MoService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.mo.findMany();
  }

  async getById(id: number) {
    const mo = await this.prisma.mo.findUnique({
      where: { id },
    });

    if (!mo) throw new NotFoundException('Такого мо не существует');

    return mo;
  }

  async create(dto: CreateMoDto) {
    return await this.prisma.mo.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: number, dto: UpdateMoDto) {
    const mo = await this.getById(id);

    return await this.prisma.mo.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number) {
    const mo = await this.getById(id);

    return await this.prisma.mo.delete({ where: { id } });
  }
}
