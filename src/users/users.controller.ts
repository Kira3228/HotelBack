import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  async getAll() {
    return await this.userService.getAll();
  }
  @Get('search')
  async getByName(@Query('name') part: string) {
    return await this.userService.getByName(part);
  }

  @Patch('udate:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const numericId = parseInt(id, 10);
    return await this.userService.updateUser(numericId, dto);
  }
  @Delete('delete:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
