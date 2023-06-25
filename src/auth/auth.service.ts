import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import { MoService } from 'src/mo/mo.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private moService: MoService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = await this.jwt.verifyAsync(dto.refreshToken);
    if (!result) throw new UnauthorizedException('Неверный refresh token');

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUserByLogin = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (oldUserByLogin)
      throw new BadRequestException('Пользователь с таким логином существует.');

    const mo = await this.moService.getById(dto.moId);

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: await hash(dto.password),
        fio: dto.fio,
        mo: {
          connect: { id: dto.moId },
        },
        role: dto.role,
        point: 0,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '6d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.login,
      role: user.role,
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден.');

    console.log(user);

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Неверный пароль.');

    return user;
  }
}
