import { FieldState, FormSchemaType } from '../types';
import { ActionHandler } from './util';

/** Mounts/remounts a field to the form. */
export type MountFieldAction = {
  type: 'MOUNT_FIELD';
  config: MountFieldArgs<any, any>;
};

export type MountFieldArgs<T extends FormSchemaType, K extends keyof T> = {
  name: K;
  validate?: FieldState<T, K>['_validate'];
  initialValue?: FieldState<T, K>['value'];
};

/** Initial and remount of field. */
export const doMountField: ActionHandler<MountFieldAction> = (fields) => ({
  name,
  validate,
  initialValue = undefined,
}) => {
  const p = fields[name as string] || ({} as FieldState);

  if (p && p._isActive) {
    console.warn('Field is already mounted');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      name: name as string,
      _isActive: true,
      _validate: validate,
      isValid: true,
      isValidating: false,
      value: p.value !== undefined ? p.value : initialValue,
      error: p.error,
      hasBlurred: false,
      hasChanged: false,
    },
  };
};
