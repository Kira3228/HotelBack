import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  readonly rating: number;
  @IsString()
  readonly content: string;

  @IsNumber()
  readonly roomId: number;
}
