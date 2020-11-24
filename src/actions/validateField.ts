import { ValidationTrigger } from '../types';

/** Trigger validation to be called on a given field. */
export type ValidateFieldAction = {
  type: 'VALIDATE_FIELD';
  config: {
    name: string;
    trigger?: ValidationTrigger;
  };
};
