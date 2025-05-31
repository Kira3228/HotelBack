import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post("post")
  async create(@Body() dto: CreateActivityDto) {
    return await this.activityService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.activityService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.activityService.getById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return await this.activityService.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.activityService.delete(+id);
  }

  @Post(':activityId/assign/:userId')
  async assignToUser(
    @Param('activityId') activityId: string,
    @Param('userId') userId: string,
  ) {
    return await this.activityService.assignToUser(+activityId, +userId);
  }
}
