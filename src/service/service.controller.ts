import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Услуги')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return await this.serviceService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.serviceService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.serviceService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateServiceDto) {
    return await this.serviceService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.serviceService.delete(id);
  }
}
