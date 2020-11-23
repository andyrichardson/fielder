import { ValidationEvent, FieldConfig, ValidationFn } from './types';

type GetValidationFnArgs<
  T extends Exclude<FieldConfig['validate'], undefined>
> = {
  event: ValidationEvent;
  validation: T;
};
/** Get appropriate validation function for a given event. */
export const getValidationFn = <
  T extends Exclude<FieldConfig['validate'], undefined>
>({
  event,
  validation,
}: GetValidationFnArgs<T>): ValidationFn | undefined => {
  if (validation === undefined) {
    return;
  }

  if (typeof validation === 'function') {
    return validation as ValidationFn;
  }

  // @ts-ignore
  if (typeof validation[event] === 'function') {
    // @ts-ignore
    return validation[event];
  }
};
