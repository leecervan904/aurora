import type {
  ArgumentMetadata,
  PipeTransform,
  Type,
} from '@nestjs/common'
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype))
      return value

    const object = plainToInstance(metatype, value)
    console.log('here', object)
    const errors = await validate(object)
    if (errors.length > 0)
      throw new BadRequestException('Validation failed')

    return value
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
