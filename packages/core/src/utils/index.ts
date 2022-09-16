import { FieldsState } from '../types';

export const getFormStateFromValues = <T extends FieldsState>(
  values: Record<string, any>
) =>
  Object.entries(values).reduce<T>(
    (p, [key, value]) => ({
      ...p,
      [key]: {
        _isActive: false,
        name: key,
        value,
        isValid: false,
        isValidating: false,
        hasBlurred: false,
        hasChanged: false,
      },
    }),
    {}
  );
