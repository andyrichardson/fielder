import {
  SetFieldValueArgs,
  BlurFieldArgs,
  UnmountFieldArgs,
  SetFieldStateArgs,
  SetFieldValidationArgs,
} from './useForm';

export type FormError = Error | string;

export type FormValue = string | boolean | number | string[];

export type FieldsState<T = any> = Record<
  keyof T & string,
  FieldState<T[keyof T & string]>
>;

export interface FormState<T extends Record<string, any> = any> {
  fields: FieldsState<T>;
  /** All mounted fields are valid. */
  isValid: boolean;
  /** Async validation currently active on a mounted fields. */
  isValidating: boolean;
  /** Set value for a field. */
  setFieldValue: (a: SetFieldValueArgs<T>) => void;
  /** Trigger blur event for a mounted field. */
  blurField: (a: BlurFieldArgs<T>) => void;
  /** Force trigger validation on a mounted field. */
  validateField: (a: {
    /** Field name */
    name: keyof T & string;
    /** Trigger (default: `change`) */
    trigger?: ValidationTrigger;
  }) => void;
  /** Force trigger validation  */
  validateFields: () => void;

  /** Internal: Manually mount field. */
  mountField: (k: FieldConfig<T>) => FieldState<T>;
  /** Internal: Manually unmount field. */
  unmountField: (k: UnmountFieldArgs<T>) => void;
  /** Internal: Manually set field state. */
  setFieldState: (a: SetFieldStateArgs<T>) => void;
  /** Internal: Set new field validation function */
  setFieldValidation: (a: SetFieldValidationArgs<T>) => void;
}

export interface FieldState<T = string | boolean | number | string[]> {
  /** The field is currently mounted. */
  readonly _isActive: boolean;
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
}

export interface FieldConfig<
  S = any,
  K extends (keyof S & string) | string = S extends Record<string, any>
    ? keyof S & string
    : string,
  V = S extends Record<string, any> ? S[K] : S
> {
  /** Unique identifier for field. */
  readonly name: K;
  /** Validation function (throws errors). */
  readonly validate?: ObjectValidation | ValidationFn;
  /** Starting value. */
  readonly initialValue?: V;
  /** Should destroy value when useField hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
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
 * `formChange`: The value of another field in the form has changed.
 *
 * `submit`: Submission has begun.
 */
export type ValidationTrigger =
  | 'mount'
  | 'blur'
  | 'change'
  | 'formChange'
  | 'submit';

/** Arguments passed to a validation function */
export type ValidationArgs<V = any, F = any> = {
  trigger: ValidationTrigger;
  value: V;
  form: F;
};

/** Handler for validation event */
export type ValidationFn<V = any, F = any> = (
  args: ValidationArgs<V, F>
) => void | Promise<void>;

/** A map of validation events corresponding to a function. */
export type ObjectValidation<V = any, F = any> = {
  [k in ValidationTrigger]?: ValidationFn<V, F>;
};
