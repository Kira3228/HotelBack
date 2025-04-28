import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload';
import { UploadImage } from './dto/image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async upload(@UploadedFile() file, @Body() dto: UploadImage) {
    const response = {
      originaName: file.originalname,
      filename: file.filename,
    };
    const filePath = `uploads/${file.filename}`;
    const image = await this.imageService.createImage(
      file.filename,
      filePath,
      dto,
    );
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }
}
