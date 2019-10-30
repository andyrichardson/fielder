import React, { useState, useRef, useCallback, useMemo, FC } from "react";
import { FormState, FieldState } from "./types";
import { FormContext } from "./context";

export const FormProvider: FC = () => {
  const [uselessState, setUselessState] = useState(false);
  const fields = useRef<Record<string, any>>({});

  /** Forces re-render after mutation. */
  const update = useCallback(() => setUselessState(s => !s), []);

  const setFields = useCallback<FormState["setFields"]>(
    arg => {
      const newFields = typeof arg === "function" ? arg(fields.current) : arg;

      Object.entries(newFields).forEach(([key, value]) => {
        if (!value) {
          delete fields.current[key];
          return;
        }

        fields.current[key] = value;
      });
      update();
    },
    [fields, update]
  );

  const validateFields = useCallback<FormState["validateFields"]>(
    () =>
      setFields(f =>
        Object.entries(f).reduce(
          (p, [key, value]) => ({
            ...p,
            [key]: validateFieldState(value)
          }),
          {}
        )
      ),
    [setFields]
  );

  const validateField = useCallback<FormState["validateField"]>(
    name => {
      setFields(f => ({
        ...f,
        [name]: validateFieldState(f[name as string])
      }));
    },
    [setFields]
  );

  const isValid = useMemo(
    () => Object.values(fields.current).every(f => f.isValid),
    [uselessState]
  );

  const value = useMemo<FormState>(
    () => ({
      fields: fields.current,
      setFields,
      validateField,
      validateFields,
      isValid
    }),
    [uselessState, setFields, validateField, validateFields]
  );

  return <FormContext.Provider value={value}></FormContext.Provider>;
};

const validateFieldState = (f: FieldState<any>) => {
  if (!f.touched || !f.validate) {
    return f;
  }

  const validationResult = f.validate(f.value);

  if (!validationResult && f.isValid) {
    return f;
  }

  return {
    ...f,
    isValid: !validationResult,
    error: validationResult
  };
};
