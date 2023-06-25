import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum EnumObjectSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllPostDto {
  @IsOptional()
  @IsEnum(EnumObjectSort)
  sort?: EnumObjectSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
