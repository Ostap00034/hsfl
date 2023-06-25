import { IsOptional, IsString } from 'class-validator';

export class UpdateCriterieDto {
  @IsOptional()
  @IsString()
  title: string;
}
