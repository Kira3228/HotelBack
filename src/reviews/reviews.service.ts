import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto, userId: number) {
    return this.prisma.review.create({
      data: {
        ...dto,
        userId: userId,
        createdAt: new Date(),
      },
      include: {
        Room: true,
        User: {select:{
          id: true,
          firstName: true,
          lastName: true,
          middleName: true,
        }},
      },
    });
  }

  async getAll(){ 
    return this.prisma.review.findMany()
  }
}
