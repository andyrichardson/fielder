import { SetStateAction } from 'react';
import { SetFieldValueArgs, BlurFieldArgs, UnmountFieldArgs } from './useForm';

export type FormError = Error | string;

export type FormValue = string | boolean | number | string[];

export type FieldsState<T = any> = Record<
  keyof T & string,
  FieldState<T[keyof T & string]>
>;

export interface FormState<T extends Record<string, any> = any> {
  fields: FieldsState<T>;
  isValid: boolean;
  isValidating: boolean;
  mountField: (k: FieldConfig<T>) => void;
  unmountField: (k: UnmountFieldArgs<T>) => void;
  setFieldValue: (a: SetFieldValueArgs<T>) => void;
  blurField: (a: BlurFieldArgs<T>) => void;
  validateField: (a: { name: keyof T & string }) => void;
  validateFields: () => void;
}

export interface FieldState<T = string | boolean | number | string[]> {
  readonly _isActive: boolean;
  readonly _validateOnChange: boolean;
  readonly _validateOnBlur: boolean;
  readonly _validateOnUpdate: boolean;
  readonly _validate: FieldConfig['validate'];

  // Props
  readonly name: string;
  readonly value?: T;

  // Meta
  readonly error?: FormError;
  readonly touched: boolean;
  readonly isValid: boolean;
  readonly isValidating: boolean;
}

export interface FieldConfig<
  S = any,
  K extends (keyof S & string) | string = S extends Record<string, any>
    ? keyof S & string
    : string,
  V = S extends Record<string, any> ? S[K] : S,
  F = S extends Record<string, any> ? S : unknown
> {
  /** Unique identifier for field. */
  readonly name: K;
  /** Validation function (throws errors). */
  readonly validate?: (value: V, form: F) => void;
  /** When the given field's value changes. */
  readonly validateOnChange?: boolean;
  /** When the given field loses focus. */
  readonly validateOnBlur?: boolean;
  /** When any change is made to the form state (global). */
  readonly validateOnUpdate?: boolean;
  /** Starting value. */
  readonly initialValue?: V;
  /** Starting error. */
  readonly initialError?: FormError;
  /** Starting touched state. */
  readonly initialTouched?: boolean;
  /** Starting valid state. */
  readonly initialValid?: boolean;
  /** Should destroy value when useField hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
}
