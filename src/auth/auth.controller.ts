import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthResponse, AuthService, TokenResponse } from './auth.service';
import { loginUserDto, RequestUserDto } from 'src/users/dto/user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthResponse, 'refresh_token'>> {
    try {
      const { access_token, refresh_token, user } =
        await this.authService.login(dto);

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prodaction',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      });
      return { access_token, user };
    } catch (errer) {
      if (errer instanceof UnauthorizedException) {
        throw new UnauthorizedException('Неверные учетные данные');
      }
      throw errer;
    }
  }

  @Post('registration')
  async registration(
    @Body() dto: RequestUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthResponse, 'refresh_token'>> {
    const { access_token, refresh_token, user } =
      await this.authService.register(dto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return { access_token, user };
  }

  @Post('refresh')
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    await this.authService.logout(refreshToken);
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
