import { FormSchemaType, ValidationTrigger } from '../types';

/** Trigger validation to be called on a given field. */
export type ValidateFieldAction = {
  type: 'VALIDATE_FIELD';
  config: ValidateFieldArgs<any>;
};

export type ValidateFieldArgs<T extends FormSchemaType> = {
  name: keyof T;
  trigger?: ValidationTrigger;
};
