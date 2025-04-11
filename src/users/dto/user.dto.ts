import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  middleName?: string;
  @IsEmail()
  email: string;
  @IsString()
  passwordHash: string;
  @IsPhoneNumber()
  phone: string;
}
export class RequestUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly middleName?: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(10)
  readonly password: string;
  @IsString()
  @IsPhoneNumber()
  readonly phone: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsString()
  @IsOptional()
  middleName?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export class loginUserDto {
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsString()
  @MinLength(10)
  readonly password: string;
}


