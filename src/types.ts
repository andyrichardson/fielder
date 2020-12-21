import { SetFieldValueArgs } from './actions/setFieldValue';
import { ValidateFieldArgs } from './actions/validateField';
import { MountFieldArgs } from './actions/mountField';
import { BlurFieldArgs } from './actions/blurField';
import { UnmountFieldArgs } from './actions/unmountField';
import { SetFieldStateArgs } from './actions/setFieldState';
import { SetFieldValidationArgs } from './actions/setFieldValidation';

export type FormValue = string | boolean | number | string[];

export type FormSchemaType = Record<string, FormValue>;

export type FieldsState<T extends FormSchemaType = FormSchemaType> = {
  [K in keyof T]: FieldState<T, K>;
};

export interface FormState<T extends FormSchemaType = FormSchemaType> {
  fields: FieldsState<T>;
  /** All mounted fields are valid. */
  isValid: boolean;
  /** Async validation currently active on a mounted fields. */
  isValidating: boolean;
  /** Set value for a field. */
  setFieldValue: <K extends keyof T>(a: SetFieldValueArgs<T, K>) => void;
  /** Trigger blur event for a mounted field. */
  blurField: (a: BlurFieldArgs<T>) => void;
  /** Force trigger validation on a mounted field. */
  validateField: (a: ValidateFieldArgs<T>) => void;

  /** Internal: Premount field during render */
  premountField: <K extends keyof T & string>(
    a: MountFieldArgs<T, K>
  ) => FieldState<T, K>;
  /** Internal: Manually mount field. */
  mountField: <K extends keyof T & string>(
    a: MountFieldArgs<T, K>
  ) => FieldState<T, K>;
  /** Internal: Manually unmount field. */
  unmountField: (a: UnmountFieldArgs<T>) => void;
  /** Internal: Manually set field state. */
  setFieldState: <K extends keyof T>(a: SetFieldStateArgs<T, K>) => void;
  /** Internal: Set new field validation function */
  setFieldValidation: <K extends keyof T>(
    a: SetFieldValidationArgs<T, K>
  ) => void;

  /** Trigger submission validation.
   *
   * Throws on synchronous validation errors.
   * Returns promise if form contains async validation.
   */
  validateSubmission: () => MaybePromise<{
    state: FieldsState;
    errors: Record<string, string>;
  }>;
}

export interface FieldState<
  T extends FormSchemaType | FormValue = FormValue,
  K extends keyof T = any,
  // Resolve value and schema form generics
  V extends FormValue = T extends FormSchemaType ? T[K] : T,
  S extends FormSchemaType = T extends FormSchemaType ? T : FormSchemaType
> {
  /** The field is currently mounted. */
  readonly _isActive: boolean;
  /** Validation function. */
  readonly _validate?: ValidationFn<V, S> | ObjectValidation<V, S>;

  // Props
  /** Field name */
  readonly name: K;
  /** Field value */
  readonly value: V;

  // Meta
  /** Field error */
  readonly error?: string;
  /** Field is currently valid. */
  readonly isValid: boolean;
  /** Field is currently being validated (async). */
  readonly isValidating: boolean;
  /** Field has been blurred since mount. */
  readonly hasBlurred: boolean;
  /** Field has been changed since mount. */
  readonly hasChanged: boolean;
}

/**
 * Events which trigger validation
 *
 * `mount`: Field has been mounted.
 *
 * `blur`: Field has had 'onBlur' event.
 *
 * `change`: Field has had 'onChange' event.
 *
 * `update`: The value of another field in the form has changed.
 *
 * `submit`: Submission has begun.
 */
export type ValidationTrigger =
  | 'mount'
  | 'blur'
  | 'change'
  | 'update'
  | 'submit';

/** Arguments passed to a validation function */
export type ValidationArgs<
  T extends FormValue = FormValue,
  S extends FormSchemaType = FormSchemaType
> = {
  trigger: ValidationTrigger;
  value: T;
  form: FieldsState<S>;
};

/** Handler for validation event */
export type ValidationFn<
  T extends FormValue = FormValue,
  S extends FormSchemaType = FormSchemaType
> = (args: ValidationArgs<T, S>) => void | Promise<void>;

/** A map of validation events corresponding to a function. */
export type ObjectValidation<
  T extends FormValue = FormValue,
  S extends FormSchemaType = FormSchemaType
> = {
  [k in ValidationTrigger]?: ValidationFn<T, S>;
};

type MaybePromise<T> = T | Promise<T>;
