import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateBookingDto } from './dto/booking.dto';
import { contains } from 'class-validator';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto, id: number) {
    console.log('12312313'+dto.status);
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
    });
    if (!room) {
      throw new BadRequestException();
    }
    if (startDate >= endDate) {
      throw new BadRequestException(
        'Дата начала должна быть раньше даты окончания',
      );
    }
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId: dto.roomId,
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
    });
    if (existingBooking) {
      throw new ConflictException('Комната уже забронирована на эти даты');
    }
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = days * parseFloat(room.price.toString());
    return await this.prisma.booking.create({
      data: {
        date: new Date(),
        startDate: startDate,
        endDate: endDate,
        status: dto.status,
        totalPrice: totalPrice,
        roomId: dto.roomId,
        userId: id,
      },
    });
  }

  async getAll() {
    return await this.prisma.booking.findMany({
      include: {
        Room: true,
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
    });
  }

  async getByPart(part: string) {
    const nameParts = part
      .trim()
      .split(/\s+/)
      .filter((p) => p.length > 0);
    if (nameParts.length === 0) {
      return [];
    }

    return await this.prisma.booking.findMany({
      where: {
        User: {
          OR: [
            ...nameParts.map((part) => ({
              firstName: { contains: part, mode: 'insensitive' as const },
            })),
            ...nameParts.map((part) => ({
              lastName: { contains: part, mode: 'insensitive' as const },
            })),
          ],
        },
      },
      include: {
        User: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        Room: true,
      },
    });
  }
}
