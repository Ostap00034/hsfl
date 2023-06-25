import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  point: string;

  @IsString()
  criterieId: string;

  @IsString()
  categoryId: string;
}
