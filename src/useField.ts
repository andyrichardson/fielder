import React, {
  useContext,
  useEffect,
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useMemo
} from "react";
import { FormContext } from "./context";
import { FormState, FormError, FieldState } from "./types";

export interface UseFieldArg<T> {
  readonly name: string;
  readonly validate?: (value: T) => string | undefined;
  readonly initialValue?: T;
  readonly initialValid?: boolean;
  readonly initialError?: FormError;
  readonly initialTouched?: boolean;
}

export type UseFieldProps<T = any> = {
  readonly name: string;
  readonly value: T;
  readonly onChange: ChangeEventHandler;
  readonly onBlur: FocusEventHandler;
};

export type UseFieldMeta = {
  readonly touched: FieldState["touched"];
  readonly error: FieldState["error"];
  readonly isValid: FieldState["isValid"];
  readonly isValidating: FieldState["isValidating"];
};

export type UseFieldResponse = [UseFieldProps, UseFieldMeta];

export const useField = <T = any>({
  name: initialName,
  validate,
  initialValid = false,
  initialError = undefined,
  initialValue = undefined,
  initialTouched = undefined
}: UseFieldArg<T>): UseFieldResponse => {
  const ctx = useContext<FormState>(FormContext);

  const name = useMemo(() => initialName, []);
  const { touched, value, error, isValid } = useMemo<FieldState<T>>(
    () =>
      (ctx.fields as any)[name] || {
        value: initialValue,
        isValid: initialValid,
        touched: initialTouched,
        error: initialError,
        isValidating: false
      },
    [name, ctx]
  );

  useEffect(() => {
    if (ctx.fields[name].active) {
      throw Error("Duplicate field mounted.");
    }

    ctx.setFields(fields => {
      const p = fields[name];

      return {
        ...fields,
        [name]: {
          active: true,
          name,
          value: p.value !== undefined ? p.value : initialValue,
          isValid: initialValid,
          touched: p.touched || initialTouched
        }
      };
    });

    ctx.setFields(f => ({
      ...f,
      [name]: {
        name,
        value: initialValue,
        isValid: initialValid || false,
        touched: initialTouched || false,
        error: initialError,
        validate
      }
    }));

    return () =>
      ctx.setFields(f => ({
        ...f,
        [name]: {
          ...f[name],
          isValid: false,
          isValidating: false
        }
      }));
  }, []);

  useEffect(() => {
    ctx.setFields(f => ({
      ...f,
      [name]: {
        ...(f as any)[name],
        validate
      }
    }));
  }, [validate, ctx.setFields]);

  const onBlur = useCallback<FocusEventHandler>(() => {
    ctx.setFields(f => ({
      ...f,
      [name]: {
        ...(f as any)[name],
        touched: true
      }
    }));
  }, [ctx.setFields]);

  const onChange = useCallback<ChangeEventHandler>(
    (e: any) => {
      ctx.setFields(f => ({
        ...f,
        [name]: {
          ...(f as any)[name],
          value: e.currentTarget.value
        }
      }));
    },
    [ctx.setFields]
  );

  console.log("rerender");

  return useMemo(
    () => [{ name, value, onBlur, onChange }, { touched, error, isValid }],
    [value, onBlur, onChange, name, touched, error, isValid, ctx]
  );
};
