import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    return this.prisma.room.create({ data: dto });
  }
  async getAll() {
    return this.prisma.room.findMany();
  }

  async getByNumber(number: number) {
    return this.prisma.room.findUnique({ where: { number } });
  }
  async update(number: number, dto: UpdateRoomDto) {
    return this.prisma.room.update({ where: { number }, data: { ...dto } });
  }
  async delete(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
