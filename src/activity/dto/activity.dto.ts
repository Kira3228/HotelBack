import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @MinLength(5)
  description: string;

  @IsDateString()
  dateOfActuvity: string;

  @IsInt()
  @Min(1)
  avaliblePlace: number;
}

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dateOfActuvity?: string;

  @IsOptional()
  @IsInt()
  avaliblePlace?: number;
}
