import React, { useState, useRef, useCallback, useMemo, FC } from "react";
import { FormState, FieldState } from "./types";
import { FormContext } from "./context";

export const FormProvider: FC = ({ children }) => {
  const [uselessState, setUselessState] = useState(false);
  const fields = useRef<Record<string, any>>({});

  /** Forces re-render after mutation. */
  const update = useCallback(() => setUselessState(s => !s), []);

  const setFields = useCallback<FormState["setFields"]>(
    (arg, noUpdate = false) => {
      const newFields = typeof arg === "function" ? arg(fields.current) : arg;

      Object.entries(newFields).forEach(([key, value]) => {
        if (!value) {
          delete fields.current[key];
          return;
        }

        fields.current[key] = value;
      });
      !noUpdate && update();
    },
    [fields, update]
  );

  const validateFields = useCallback<FormState["validateFields"]>(
    () =>
      setFields(
        f =>
          Object.entries(f).reduce(
            (p, [key, value]) => ({
              ...p,
              [key]: validateFieldState(value)
            }),
            {}
          ),
        true
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

  useMemo(validateFields, [uselessState]);

  const isValid = useMemo(
    () => Object.values(fields.current).every(f => f.isValid),
    [uselessState]
  );

  const value = useMemo<FormState>(
    () => ({
      fields: fields.current,
      setFields,
      validateField: (name: any) => {
        validateField(name);
        update();
      },
      validateFields: () => {
        validateFields();
        update();
      },
      isValid
    }),
    [uselessState, setFields, validateField, validateFields, isValid]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
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
