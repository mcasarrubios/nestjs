import { IsString, MaxLength, IsEmail, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined() @IsEmail() @MaxLength(100) readonly email: string;
  @IsString() @MaxLength(30) readonly firstName: string;
  @IsString() @MaxLength(30) readonly lastName: string;
}