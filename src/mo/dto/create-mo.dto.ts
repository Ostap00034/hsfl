import { IsString } from 'class-validator';

export class CreateMoDto {
  @IsString()
  title: string;
}
