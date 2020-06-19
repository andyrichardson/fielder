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
  /** The field is currently mounted. */
  readonly _isActive: boolean;
  /** Trigger validation on change. */
  readonly _validateOnChange: boolean;
  /** Trigger validation on blur. */
  readonly _validateOnBlur: boolean;
  /** Trigger validation on any form value change. */
  readonly _validateOnUpdate: boolean;
  /** Validation function. */
  readonly _validate: FieldConfig['validate'];

  // Props
  /** Field name */
  readonly name: string;
  /** Field value */
  readonly value?: T;

  // Meta
  /** Field error */
  readonly error?: FormError;
  /** Field is currently valid. */
  readonly isValid: boolean;
  /** Field is currently being validated (async). */
  readonly isValidating: boolean;
  /** Field has been blurred since mount. */
  readonly hasBlurred: boolean;
  /** Field has been changed since mount. */
  readonly hasChanged: boolean;
  /** @deprecated Field has been touched. */
  readonly touched: boolean;
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
  /** Starting valid state. */
  readonly initialValid?: boolean;
  /** Should destroy value when useField hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
  /** @deprecated Starting touched state. */
  readonly initialTouched?: boolean;
}

export interface FieldGroupConfig<
  S = any,
  K extends (keyof S & string) | string = S extends Record<string, any>
    ? keyof S & string
    : string,
  V = S extends Record<string, any> ? S[K] : S,
  F = S extends Record<string, any> ? S : unknown
> {
  /** Unique identifier for field group. */
  readonly name: K;
  /** Validation function for group (throws errors). */
  readonly validate?: (value: V, form: F) => void;
  /** When the given group's value changes. */
  readonly validateOnChange?: boolean;
  /** When any change is made to the form state (global). */
  readonly validateOnUpdate?: boolean;
  /** Starting value. */
  readonly initialValue?: V | [];
  /** Starting error. */
  readonly initialError?: FormError;
  /** Starting valid state. */
  readonly initialValid?: boolean;
  /** Should destroy value when useFieldGroup hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
}
