import {
  IsEmail,
  MinLength,
  IsString,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsString()
  login: string;
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
}
