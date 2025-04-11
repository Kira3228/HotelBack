import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BookingService, PrismaService, ],
  controllers: [BookingController],
  imports: [AuthModule]
})
export class BookingModule {}
