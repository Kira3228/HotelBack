import { IsDecimal, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  readonly number: number;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly capacity: number;
  @IsDecimal()
  readonly price: number;
  @IsString()
  readonly status: string;
}

export class UpdateRoomDto {
  @IsNumber()
  readonly number?: number;
  @IsString()
  readonly description?: string;
  @IsNumber()
  readonly capacity?: number;
  @IsDecimal()
  readonly price?: number;
  @IsString()
  readonly status?: string;
}
