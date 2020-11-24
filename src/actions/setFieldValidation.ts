import { FieldState, FormSchemaType } from '../types';
import { ActionHandler } from './util';

/** Sets the value of a field. */
export type SetFieldValidationAction = {
  type: 'SET_FIELD_VALIDATION';
  config: SetFieldValidationArgs<any, any>;
};

export type SetFieldValidationArgs<
  T extends FormSchemaType,
  K extends keyof T
> = {
  name: K;
  validation?: FieldState<T, K>['_validate'];
};

/** Triggers a change to the given field. */
export const doSetFieldValidation: ActionHandler<SetFieldValidationAction> = (
  fields
) => ({ name, validation }) => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error('Cannot set validation on non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field validation for inactive field.');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      _validate: validation,
    },
  };
};
