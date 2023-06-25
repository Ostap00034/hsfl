import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
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
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.postService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/byuserid/:id')
  @Auth()
  async getAllById(@Param('id') id: string) {
    return this.postService.getAllById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@CurrentUser('id') userId, @Body() dto: CreatePostDto) {
    return this.postService.create(userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateObject(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteObject(@Param('id') id: string) {
    return this.postService.delete(+id);
  }
}
