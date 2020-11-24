import { FormSchemaType } from '../types';
import { ActionHandler } from './util';

/** Unmounts/removes a field to the form. */
export type UnmountFieldAction = {
  type: 'UNMOUNT_FIELD';
  config: UnmountFieldArgs<any>;
};

export type UnmountFieldArgs<T extends FormSchemaType> = {
  name: keyof T;
  destroy?: boolean;
};

/** Unmount of field. */
export const doUnmountField: ActionHandler<UnmountFieldAction> = (fields) => ({
  name,
  destroy = false,
}) => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
  }

  if (destroy) {
    return Object.entries(fields).reduce(
      (state, [key, value]) =>
        key === name ? state : { ...state, [key]: value },
      {}
    );
  }

  return {
    ...fields,
    [name]: {
      ...p,
      _isActive: false,
    },
  };
};
