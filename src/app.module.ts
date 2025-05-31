import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './Prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RoomsModule } from './rooms/rooms.module';
import { BookingModule } from './booking/booking.module';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { ServiceModule } from './service/service.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    UsersModule,
    ReviewsModule,
    AuthModule,
    RoomsModule,
    BookingModule,
    ImageModule,
    MulterModule.register({
      dest: './uploads'
    }),
    ServiceModule,
    ActivityModule
  ],
  controllers: [ImageController],
  providers: [PrismaService, AuthService, ImageService],
  exports: [PrismaService],
})
export class AppModule {}
