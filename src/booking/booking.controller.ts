import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateBookingDto, @GetUser('id') id: number){
        console.log('zxcvzxcv'+dto.status)
        return await this.bookingService.create(dto, id)
    }
    @Get('get-all')
    async getAll(){
        return await this.bookingService.getAll();
    }

    @Get('get-by-name-part')
    async getByPart(@Query('part') part: string){
        return await this.bookingService.getByPart(part)
    }
}
