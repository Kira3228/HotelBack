import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
    imports: [], 
    providers: [ImageService, PrismaService],
    controllers: [ImageController],
    exports: [ImageService]
})
export class ImageModule {}
