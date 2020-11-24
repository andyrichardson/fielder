import { FieldsState } from '../types';

export type ActionHandler<
  T extends { type: string; config?: any },
  Config = T extends { config: infer C } ? C : never
> = (state: FieldsState) => (args: Config) => FieldsState;
