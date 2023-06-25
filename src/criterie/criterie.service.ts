import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCriterieDto } from './dto/update-criterie.dto';
import { CreateCriterieDto } from './dto/create-criterie.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class CriterieService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async getAll() {
    return await this.prisma.criterie.findMany();
  }

  async getById(id: number) {
    const criterie = await this.prisma.criterie.findUnique({
      where: { id },
    });

    if (!criterie) throw new NotFoundException('Такого критерия не существует');

    return criterie;
  }

  async create(dto: CreateCriterieDto) {
    const { title, categoryId } = dto;
    const category = await this.categoryService.getById(categoryId);

    return await this.prisma.criterie.create({
      data: {
        title,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateCriterieDto) {
    const category = await this.getById(id);

    return await this.prisma.criterie.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number) {
    const criterie = await this.getById(id);

    return await this.prisma.criterie.delete({ where: { id } });
  }
}
