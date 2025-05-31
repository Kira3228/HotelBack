import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateActivityDto) {
    return await this.prisma.activity.create({
        data: {
        ...dto,
        dateOfActuvity: new Date(dto.dateOfActuvity),
        },
    });
    }


  async getAll() {
    return await this.prisma.activity.findMany();
  }

  async getById(id: number) {
    const activity = await this.prisma.activity.findUnique({ where: { id } });
    if (!activity) throw new NotFoundException('Activity not found');
    return await activity;
  }

  async update(id: number, dto: UpdateActivityDto) {
    return await this.prisma.activity.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return await this.prisma.activity.delete({ where: { id } });
  }

  async assignToUser(activityId: number, userId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        activity: {
          connect: { id: activityId },
        },
      },
    });
  }
}
