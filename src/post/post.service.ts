import { ReturnPostObject } from './return-post.dto';
import { CategoryService } from './../category/category.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CriterieService } from 'src/criterie/criterie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    private criterieService: CriterieService,
    private userService: UserService,
  ) {}

  async getAll() {
    return await this.prisma.post.findMany({
      select: { ...ReturnPostObject },
    });
  }

  async getById(id: number) {
    const category = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!category)
      throw new NotFoundException('Такой публикации не существует');

    return category;
  }

  async create(userId: number, dto: CreatePostDto) {
    const { title, point, criterieId, categoryId } = dto;

    const category = await this.categoryService.getById(dto.categoryId);
    const criterie = await this.criterieService.getById(dto.criterieId);

    await this.userService.addPoint(userId, point);

    return await this.prisma.post.create({
      data: {
        title,
        point,
        category: {
          connect: { id: categoryId },
        },
        criterie: {
          connect: {
            id: criterieId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.getById(id);

    return await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number) {
    const post = await this.getById(id);

    return await this.prisma.post.delete({ where: { id } });
  }
}
