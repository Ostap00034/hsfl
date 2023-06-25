import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateMoDto } from './dto/create-mo.dto';
import { MoService } from './mo.service';
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
import { UpdateMoDto } from './dto/update-mo.dto';

@Controller('mo')
export class MoController {
  constructor(private readonly moService: MoService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.moService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.moService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateMoDto) {
    return this.moService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateObject(@Param('id') id: string, @Body() dto: UpdateMoDto) {
    return this.moService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteObject(@Param('id') id: string) {
    return this.moService.delete(+id);
  }
}
