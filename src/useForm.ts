import { useReducer, Reducer, useCallback, useMemo } from "react";
import { FormState, FieldState, FieldConfig } from "./types";

interface MountFieldAction {
  type: "MOUNT_FIELD";
  config: FieldConfig;
}

interface UnmountFieldAction {
  type: "UNMOUNT_FIELD";
  config: UnmountFieldArgs;
}

interface SetFieldValueAction {
  type: "SET_FIELD_VALUE";
  config: SetFieldValueArgs;
}

interface BlurFieldAction {
  type: "BLUR_FIELD";
  config: BlurFieldArgs;
}

type FormAction =
  | MountFieldAction
  | UnmountFieldAction
  | SetFieldValueAction
  | BlurFieldAction;

type FieldsState = Record<string, FieldState | undefined>;

export const useForm = () => {
  const [state, dispatch] = useReducer<Reducer<FieldsState, FormAction>>(
    (s, a) => {
      const newState = applyActionToState(s, a);

      return applyValidationToState(newState, a);
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

  const setFieldValue = useCallback<FormState["setFieldValue"]>(
    config => dispatch({ type: "SET_FIELD_VALUE", config }),
    [dispatch]
  );

  const blurField = useCallback<FormState["blurField"]>(
    config => dispatch({ type: "BLUR_FIELD", config }),
    [dispatch]
  );

  const mountedFields = useMemo(
    () =>
      Object.values(state).filter(
        f => !(f === undefined || !f._isActive)
      ) as FieldState[],
    [state]
  );
  const isValid = useMemo(() => mountedFields.every(f => f.isValid), [
    mountedFields
  ]);

  const isValidating = useMemo(() => mountedFields.some(f => f.isValidating), [
    mountedFields
  ]);

  return useMemo(
    () => ({
      state,
      mountField,
      unmountField,
      setFieldValue,
      blurField,
      isValid,
      isValidating
    }),
    [state, mountField, unmountField, isValid, isValidating]
  );
};

/** Triggers primary action to state. */
const applyActionToState = (s: FieldsState, a: FormAction) => {
  if (a.type === "MOUNT_FIELD") {
    return doMountField(s)(a.config);
  }

  if (a.type === "UNMOUNT_FIELD") {
    return doUnmountField(s)(a.config);
  }

  if (a.type === "SET_FIELD_VALUE") {
    return doSetFieldValue(s)(a.config);
  }

  if (a.type === "BLUR_FIELD") {
    return doBlurField(s)(a.config);
  }

  return s;
};

/** Triggers validation on fields items. */
const applyValidationToState = (s: FieldsState, a: FormAction): FieldsState => {
  if (!["SET_FIELD_VALUE", "BLUR_FIELD"].includes(a.type)) {
    return s;
  }

  return Object.keys(s).reduce((state, key) => {
    const field = state[key];

    if (field === undefined || !field._isActive || !field._validate) {
      return state;
    }

    const validateBlur =
      a.type === "BLUR_FIELD" &&
      a.config.name === field.name &&
      field._validateOnBlur;
    const validateChange =
      a.type === "SET_FIELD_VALUE" &&
      a.config.name === field.name &&
      field._validateOnChange;
    const validateUpdate =
      a.type === "SET_FIELD_VALUE" && field._validateOnChange;

    if (!(validateBlur || validateChange || validateUpdate)) {
      return state;
    }

    const validateResponse = field._validate(field.value, state) as any;

    if (!(validateResponse instanceof Promise)) {
      return {
        ...state,
        [key]: {
          ...field,
          isValid: validateResponse === undefined,
          isValidating: false,
          error: validateResponse
        }
      };
    }

    return {
      ...state,
      [key]: {
        ...field,
        isValidating: true
      }
    };
  }, s);
};

/** Initial and remount of field. */
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
  const p = fields[name as string] || ({} as FieldState);

  if (p && p._isActive) {
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

export interface UnmountFieldArgs<T = string> {
  name: keyof T;
  destroy?: boolean;
}

/** Unmount of field. */
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

export interface SetFieldValueArgs<T = any, K extends keyof T = keyof T> {
  name: K;
  value: T[K];
}

/** Triggers a change to the given field. */
const doSetFieldValue = (fields: FieldsState) => <T>({
  name,
  value
}: SetFieldValueArgs<T>): FieldsState => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error("Cannot set value on non-mounted field");
  }

  if (!p._isActive) {
    console.warn("Setting field value for inactive field.");
  }

  return {
    ...fields,
    [name]: {
      ...p,
      value
    }
  };
};

export interface BlurFieldArgs<T = any, K extends keyof T = keyof T> {
  name: K;
}

/** Triggers a change to the given field. */
const doBlurField = (fields: FieldsState) => <T = any>({
  name
}: BlurFieldArgs): FieldsState => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error("Cannot unmount non-mounted field");
  }

  if (!p._isActive) {
    console.warn("Setting field attribute on inactive field.");
  }

  return {
    ...fields,
    [name]: {
      ...p,
      touched: true
    }
  };
};
