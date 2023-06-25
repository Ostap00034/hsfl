import {
  Controller,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Body,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Put('addPoint')
  async addPoint(userId: number, points: number) {
    return this.userService.addPoint(userId, points);
  }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(
    @CurrentUser('id') id: number,
    @CurrentUser('login') login: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, login, dto);
  }
}
