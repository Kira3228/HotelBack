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

  async login(
    dto: loginUserDto,
  ): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
    const user = await this.validateUser(dto);
    const token = await this.generateToken(user);
    const { passwordHash, ...userData } = user;
    return { token, user: userData };
  }

  async register(
    dto: RequestUserDto,
  ): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
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

    const token = await this.generateToken(user);
    const { passwordHash, ...userData } = user;
    return { token, user: userData };
  }

  private async generateToken(user: User): Promise<string> {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
