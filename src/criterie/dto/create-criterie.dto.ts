import { IsNumber, IsString } from 'class-validator';

export class CreateCriterieDto {
  @IsString()
  title: string;

  @IsString()
  categoryId: string;
}
