import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ReturnCategoryObject } from './return-category.object';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({
      select: {
        ...ReturnCategoryObject,
      },
    });
  }

  async getById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new NotFoundException('Такой категории не существует');

    return category;
  }

  async create(dto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.getById(id);

    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number) {
    const category = await this.getById(id);

    return await this.prisma.category.delete({ where: { id } });
  }
}
