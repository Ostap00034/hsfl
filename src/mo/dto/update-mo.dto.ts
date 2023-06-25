import { IsOptional, IsString } from 'class-validator';

export class UpdateMoDto {
  @IsOptional()
  @IsString()
  title: string;
}
