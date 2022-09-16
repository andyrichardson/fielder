import { createContext, useContext } from 'react';
import { FormState } from '@fielder/core';

export const FielderContext = createContext<FormState<any>>(null as any);

export const useFormContext = () => useContext(FielderContext);

export const FielderProvider = FielderContext.Provider;
