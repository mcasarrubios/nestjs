import { IsDefined, IsInt } from 'class-validator';

export class CreateAuthTokenDto {
  @IsDefined() @IsInt() readonly id: string;
}