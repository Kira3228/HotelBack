import { IsDecimal, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly capacity: number;
  @IsDecimal()
  readonly price: string;
  @IsString()
  readonly status: string;
  @IsInt()
  readonly area: number;
}

export class UpdateRoomDto {
  @IsString()
  readonly name?: string;
  @IsString()
  readonly description?: string;
  @IsNumber()
  readonly capacity?: number;
  @IsDecimal()
  readonly price?: number;
  @IsString()
  readonly status?: string;
  @IsInt()
  readonly area?: number;
}
