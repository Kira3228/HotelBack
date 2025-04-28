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
    return this.prisma.room.findMany({include:{
      Image: true
    }});
  }

  async delete(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
