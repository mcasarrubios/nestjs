import { IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString() @MaxLength(100) readonly name: string;
  @IsString() readonly description: string;
}