import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  fio?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
