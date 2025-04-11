import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
