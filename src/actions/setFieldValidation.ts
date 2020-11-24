import { ValidationFn, ObjectValidation } from '../types';
import { ActionHandler } from './util';

/** Sets the value of a field. */
export type SetFieldValidationAction = {
  type: 'SET_FIELD_VALIDATION';
  config: {
    name: string;
    validation: ValidationFn | ObjectValidation | undefined;
  };
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
