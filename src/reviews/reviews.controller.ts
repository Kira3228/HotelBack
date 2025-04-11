import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateReviewDto, @GetUser('id') userId: number) {
    console.log(userId);
    if (!userId) throw new UnauthorizedException('User ID not found');
    return await this.reviewService.create(dto, userId);
  }
  @Get()
  async getAll(){
    return await this.reviewService.getAll()
  }
}
