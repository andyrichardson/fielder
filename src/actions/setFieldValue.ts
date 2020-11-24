import { ActionHandler } from './util';
import { SetStateAction } from 'react';
import { FormSchemaType } from '../types';

export type SetFieldValueAction = {
  type: 'SET_FIELD_VALUE';
  config: SetFieldValueArgs<any, any>;
};

export type SetFieldValueArgs<T extends FormSchemaType, K extends keyof T> = {
  name: K;
  value: SetStateAction<T[K]>;
};

/** Triggers a change to the given field. */
export const doSetFieldValue: ActionHandler<SetFieldValueAction> = (
  fields
) => ({ name, value }) => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error('Cannot set value on non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field value for inactive field.');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      value: typeof value === 'function' ? (value as any)(p.value) : value,
      hasChanged: true,
    },
  };
};
