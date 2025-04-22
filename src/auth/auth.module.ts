import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, PrismaService],
  exports: [JwtModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
