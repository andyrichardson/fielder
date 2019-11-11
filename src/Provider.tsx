import React, { useCallback, FC, useReducer, Reducer } from "react";
import { FormState, FieldState, FieldConfig, UnmountFieldArgs } from "./types";
import { FormContext } from "./context";

export const FormProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<FieldsState, FormAction>>(
    (s, a) => {
      let newState = s;

      if (a.type === "MOUNT_FIELD") {
        newState = doMountField(s)(a.config);
      }

      if (a.type === "UNMOUNT_FIELD") {
        newState = doUnmountField(s)(a.config);
      }

      return newState;
    },
    {}
  );

  const mountField = useCallback<FormState["mountField"]>(
    config => dispatch({ type: "MOUNT_FIELD", config }),
    [dispatch]
  );

  const unmountField = useCallback<FormState["unmountField"]>(
    config => dispatch({ type: "UNMOUNT_FIELD", config }),
    [dispatch]
  );

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>;
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

type FormAction = MountFieldAction | UnmountFieldAction;
type FieldsState = Record<string, FieldState | undefined>;

interface MountFieldAction {
  type: "MOUNT_FIELD";
  config: FieldConfig;
}

interface UnmountFieldAction {
  type: "UNMOUNT_FIELD";
  config: UnmountFieldArgs;
}

const doMountField = (fields: FieldsState) => ({
  name,
  validate,
  validateOnChange = true,
  validateOnBlur = false,
  validateOnUpdate = false,
  initialValue = undefined,
  initialError = undefined,
  initialValid = false,
  initialTouched = false
}: FieldConfig): FieldsState => {
  const p = fields[name as string];

  if (p._isActive) {
    throw Error("Field is already mounted");
  }

  return {
    ...fields,
    [name]: {
      ...p,
      name: name as string,
      _isActive: true,
      _validateOnBlur: validateOnBlur,
      _validateOnChange: validateOnChange,
      _validateOnUpdate: validateOnUpdate,
      _validate: validate,
      isValid: initialValid,
      isValidating: false,
      value: p.value !== undefined ? p.value : initialValue,
      error: p.error || initialError,
      touched: p.touched || initialTouched
    }
  };
};

const doUnmountField = (fields: FieldsState) => ({
  name,
  destroy = false
}: UnmountFieldArgs): FieldsState => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error("Cannot unmount non-mounted field");
  }

  if (destroy) {
    return {
      ...fields,
      [name]: undefined
    };
  }

  return {
    ...fields,
    [name]: {
      ...p,
      _isActive: false
    }
  };
};
