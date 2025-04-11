import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ReviewsService, PrismaService],
  controllers: [ReviewsController],
  imports:[
    AuthModule
  ]
})
export class ReviewsModule {}
