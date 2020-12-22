import { SetStateAction } from 'react';
import { FieldState, FormSchemaType } from '../types';
import { ActionHandler } from './util';

/** Set state of a field (without triggering validation). */
export type SetFieldStateAction = {
  type: 'SET_FIELD_STATE';
  config: SetFieldStateArgs<any, any>;
};

export type SetFieldStateArgs<T extends FormSchemaType, K extends keyof T> = {
  name: K;
  state: SetStateAction<FieldState<T, K>>;
};

export const doSetFieldState: ActionHandler<SetFieldStateAction> = (
  fields
) => ({ name, state }) => {
  const p = fields[name];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
  }

  const newState = typeof state === 'function' ? state(p) : state;

  /** Same object reference was returned. */
  if (newState === p) {
    return fields;
  }

  return {
    ...fields,
    [name]: newState,
  };
};
