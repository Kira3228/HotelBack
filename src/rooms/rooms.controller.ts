import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return await this.roomService.create(dto);
  }

  @Get('get-all')
  async getAll() {
    return await this.roomService.getAll();
  }
  @Get('avalible')
  async getAvalible(){
    return await this.roomService.getAvalible();
  }
  @Get('room/:id')
  async getById(@Param('id') id: number){
    return this.roomService.getById(id)
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.roomService.delete(id);
  }
}
