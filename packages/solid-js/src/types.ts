import { FormSchemaType, FormState } from '@fielder/core';
import { Accessor } from 'solid-js';

type PickAccessorKeys<T, K extends keyof T> = Omit<T, K> &
  { [I in K]: Accessor<T[I]> };

export type SolidFormState<T extends FormSchemaType> = PickAccessorKeys<
  FormState<T>,
  'fields' | 'isValid' | 'isValidating'
>;
