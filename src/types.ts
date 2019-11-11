import { SetStateAction } from "react";

export type FormError = string;

export interface FormState<T extends Record<string, any> = any> {
  fields: Record<keyof T, FieldState<T[keyof T]>>;
  isValid: boolean;
  isValidating: boolean;
  mountField: (k: FieldConfig<T>) => void;
  unmountField: (k: UnmountFieldArgs<T>) => void;
  validateField: (name: keyof T) => void;
  validateFields: () => void;
}

export interface UnmountFieldArgs<T = string> {
  name: keyof T;
  destroy?: boolean;
}

export interface FieldState<T = any> {
  readonly _isActive: boolean;
  readonly _validateOnChange: boolean;
  readonly _validateOnBlur: boolean;
  readonly _validateOnUpdate: boolean;
  readonly _validate: FieldConfig["validate"];

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
  K extends keyof S | string = S extends Record<string, any> ? keyof S : string,
  V = S extends Record<string, any> ? S[K] : S,
  F = S extends Record<string, any> ? S : unknown
> {
  /** Unique identifier for field. */
  readonly name: K;
  /** Validation function. */
  readonly validate?: (value: V, form: F) => FormError;
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
}
