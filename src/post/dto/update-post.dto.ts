import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  point: string;

  @IsOptional()
  @IsString()
  criterieId: string;

  @IsOptional()
  @IsString()
  categoryId: string;
}
