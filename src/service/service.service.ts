import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    if (!dto.name || dto.price === undefined) {
      throw new BadRequestException('Название услуги и цена обязательны');
    }

    return await this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description ?? '',
        price: dto.price,
      },
    });
  }

  async getAll() {
    return await this.prisma.service.findMany();
  }

  async getById(id: number) {
    return await this.prisma.service.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateServiceDto) {
    return await this.prisma.service.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.service.delete({ where: { id } });
  }
}
