import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateObject(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteObject(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }
}
