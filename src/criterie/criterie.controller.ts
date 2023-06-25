import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCriterieDto } from './dto/create-criterie.dto';
import { CriterieService } from './criterie.service';
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
import { UpdateCriterieDto } from './dto/update-criterie.dto';

@Controller('criteries')
export class CriterieController {
  constructor(private readonly criterieService: CriterieService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.criterieService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.criterieService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateCriterieDto) {
    return this.criterieService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateObject(@Param('id') id: string, @Body() dto: UpdateCriterieDto) {
    return this.criterieService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteObject(@Param('id') id: string) {
    return this.criterieService.delete(+id);
  }
}
