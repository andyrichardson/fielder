import { SetStateAction } from "react";
import { Schema } from "yup";
import { string } from "prop-types";

export type FormError = string;

export interface FormState<T extends Record<string, any> = any> {
  fields: Record<keyof T, FieldState<T[keyof T]>>;
  setFields: (
    arg: SetStateAction<
      FormState<Record<keyof T, T[keyof T] | undefined>>["fields"]
    >
  ) => void;
  validateFields: () => void;
  validateField: (name: keyof T) => void;
  isValid: boolean;
}

export interface FieldState<T = any> {
  name: string;
  value?: T;
  touched: boolean;
  isValid: boolean;
  error?: FormError;
  validate?: (value: T) => FormError | undefined;
}
