import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  providers: [RoomsService, PrismaService],
  controllers: [RoomsController],
})
export class RoomsModule {}
