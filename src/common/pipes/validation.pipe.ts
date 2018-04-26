import { BadRequestException } from '@nestjs/common';
import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  
  constructor(private _validatorOptions: ValidatorOptions) {}

  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, this._validatorOptions);
    if (errors.length > 0) {
      throw new BadRequestException(
        `Validation failed in following fields: ${errors.map(err => err.property)}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
