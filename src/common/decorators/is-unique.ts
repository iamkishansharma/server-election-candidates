import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from 'src/database/constraints/is-unique';

export type IsUniqueInterface = {
  tableName: string;
  column: string;
};

export function isUnique<T extends object>(options: IsUniqueInterface, validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: keyof T) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
