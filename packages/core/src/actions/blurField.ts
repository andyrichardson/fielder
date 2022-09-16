import { FormSchemaType } from '../types';
import { ActionHandler } from './util';

/** Sets a field to `hasBlurred`. */
export type BlurFieldAction = {
  type: 'BLUR_FIELD';
  config: BlurFieldArgs<any>;
};

export type BlurFieldArgs<T extends FormSchemaType> = {
  name: keyof T;
};

/** Triggers a change to the given field. */
export const doBlurField: ActionHandler<BlurFieldAction> = (fields) => ({
  name,
}) => {
  const p = fields[name];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field attribute on inactive field.');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      hasBlurred: true,
    },
  };
};
