import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsNumber()
  point: number;

  @IsNumber()
  criterieId: number;

  @IsNumber()
  categoryId: number;
}
