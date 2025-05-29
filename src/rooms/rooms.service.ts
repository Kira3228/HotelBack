import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    return this.prisma.room.create({ data: dto });
  }
  async getAll() {
    return this.prisma.room.findMany({
      include: {
        Image: true,
      },
    });
  }
  async getAvalible() {
    return await this.prisma.room.findMany({
      where: {
        status: 'available',
      },
      include: {
        Image: true,
      },
    });
  }
  async delete(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }

  async getById(id: number) {
    const room = await this.prisma.room.findFirst({
      where: { id: id },
      include: { Review: { include: { User: true } }, Image: true },
    });
    if (!room) {
      throw new BadRequestException(`Комнаты с id ${id} не существует`);
    }
    return room;
  }
}
