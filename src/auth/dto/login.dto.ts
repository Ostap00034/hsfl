import { MinLength, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов.',
  })
  @IsString()
  password: string;
}
