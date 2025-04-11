import { IsDateString, IsNumber, IsString } from "class-validator"

export class CreateBookingDto {
  @IsDateString()
  readonly startDate: string;
  @IsDateString()
  readonly endDate: string;
  @IsString()
  readonly status: string;
  @IsNumber()
  readonly roomId: number;
}