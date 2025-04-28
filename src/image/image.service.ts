import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UploadImage } from './dto/image.dto';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService){}

    async createImage(fileName: string, path: string, dto: UploadImage){
        const imageUrl = `http://localhost:3000/uploads/${fileName}`;

        return this.prisma.image.create({
            data: {
                fileName: fileName,
                path,
                url: imageUrl,
                roomId: dto.roomId
            }
        })
    }
}
