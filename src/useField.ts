import React, {
  useContext,
  useEffect,
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useMemo,
  useLayoutEffect
} from "react";
import { FormContext } from "./context";
import { FormState, FormError, FieldState, FieldConfig } from "./types";

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
  initialTouched = false,
  validateOnBlur = true,
  validateOnChange = true,
  validateOnUpdate = false,
  destroyOnUnmount = false
}: FieldConfig<T>): UseFieldResponse => {
  const {
    fields,
    blurField,
    mountField,
    unmountField,
    setFieldValue
  } = useContext<FormState>(FormContext);

  const name = useMemo(() => initialName, []);
  const field = useMemo(
    () =>
      fields[initialName] || {
        name,
        error: initialError,
        valid: initialValid,
        value: initialValue,
        touched: initialTouched
      },
    [fields]
  );

  useLayoutEffect(() => {
    if (fields[name] && fields[name]._isActive) {
      throw Error("Duplicate field mounted.");
    }

    mountField({
      name,
      initialError,
      initialValid,
      initialValue,
      initialTouched,
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnUpdate
    });

    return () => unmountField({ name, destroy: destroyOnUnmount });
  }, [mountField]);

  const onBlur = useCallback<FocusEventHandler>(() => {
    blurField({ name });
  }, [blurField]);

  const onChange = useCallback<ChangeEventHandler>(
    e => setFieldValue(e.target as any),
    [setFieldValue]
  );

  const { value, touched, error, isValid, isValidating } = field;

  return useMemo(
    () => [
      { name, value, onBlur, onChange },
      { touched, error, isValid, isValidating }
    ],
    [value, onBlur, onChange, name, touched, error, isValid, isValidating]
  );
};
