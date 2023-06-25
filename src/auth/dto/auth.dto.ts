import { MinLength, IsString, IsOptional, IsEmail } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  fio: string;
  @IsOptional()
  @IsString()
  role: string;
  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов.',
  })
  @IsString()
  password: string;
  @IsString()
  moId: number;
}
