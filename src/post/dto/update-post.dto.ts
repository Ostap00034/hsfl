import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsNumber()
  criterieId: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
