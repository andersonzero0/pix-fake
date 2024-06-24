import { OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class FindUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  txid?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;
}

export class FindUserByIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(.{11}|.{14})$/, {
    message: 'txid must be either 11 or 14 characters long',
  })
  txid: string;
}
