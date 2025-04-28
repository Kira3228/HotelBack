import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class UploadImage {
  @Type(() => Number)
  @IsInt()
  roomId: number;
}