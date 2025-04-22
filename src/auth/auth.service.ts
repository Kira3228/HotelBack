import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/Prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { loginUserDto, RequestUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  private async validateUser(dto: loginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Некорректный Email или пароль');
    }
    const passwordEquals = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный Email или пароль',
    });
  }

  async login(dto: loginUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Omit<User, 'passwordHash'>;
  }> {
    const user = await this.validateUser(dto);
    const access_token = await this.generateToken(user);
    const refresh_token = await this.generateRefreshToken(user.id);

    const { passwordHash, ...userData } = user;
    return { access_token, refresh_token, user: userData };
  }

  async register(dto: RequestUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Omit<User, 'passwordHash'>;
  }> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким Email уже сущестет',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      email: dto.email,
      phone: dto.phone,
      passwordHash: hashPassword,
    });

    const access_token = await this.generateToken(user);
    const refresh_token = await this.generateRefreshToken(user.id);
    const { passwordHash, ...userData } = user;
    return { access_token, refresh_token, user: userData };
  }

  private async generateToken(user: User): Promise<string> {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      id: user.id,
    };
    return this.jwtService.sign(payload, {expiresIn: '15m'});
  }
  private async generateRefreshToken(userId: number): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
    return token;
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const tokenData = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    if (!tokenData || tokenData.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Недействительный или просроченный токен',
      );
    }
    const payload = {
      firstName: tokenData.user.firstName,
      middleName: tokenData.user.middleName,
      lastName: tokenData.user.lastName,
      id: tokenData.user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
      },
    });
    
  }
}
export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: Omit<User, 'passwordHash'>;
};

export type TokenResponse = {
  access_token: string;
};
