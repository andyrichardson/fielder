import { createContext, useContext } from 'solid-js';
import { FormState } from '@fielder/core';

export const FielderContext = createContext<FormState<any>>(null as any);

export const useFormContext = () => useContext(FielderContext);

export const FielderProvider = FielderContext.Provider;
