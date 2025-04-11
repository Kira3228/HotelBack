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


@Module({
  imports: [UsersModule, ReviewsModule, AuthModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' +Math.round(Math.random()*1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueName}${ext}`;
          callback(null,filename)
        },
      }),
      limits:{
        fileSize: 5*1024*1024,
      },
        fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only images are allowed!'), false);
        }
        callback(null, true);
      },
    }),
    RoomsModule,
    BookingModule
  ],
  controllers: [],
  providers: [PrismaService, AuthService],
  exports: [PrismaService],
})
export class AppModule {}
