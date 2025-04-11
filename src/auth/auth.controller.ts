import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto, RequestUserDto } from 'src/users/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() dto: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token, user } = await this.authService.login(dto);
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prodaction',
        maxAge: 86400000,
        sameSite: 'strict',
      });
      return { user };
    } catch (errer) {
      if (errer instanceof UnauthorizedException) {
        throw new UnauthorizedException('Неверные учетные данные');
      }
    }
  }

  @Post('registration')
  async registration(
    @Body() dto: RequestUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.register(dto);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
      sameSite: 'strict',
    });
    return { user };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out' };
  }
}
