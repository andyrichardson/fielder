import {
  useReducer,
  Reducer,
  useCallback,
  useMemo,
  SetStateAction
} from "react";
import { FormState, FieldState, FieldConfig, FieldsState } from "./types";

interface MountFieldAction<T = any> {
  type: "MOUNT_FIELD";
  config: FieldConfig<T>;
}

interface UnmountFieldAction<T = any> {
  type: "UNMOUNT_FIELD";
  config: UnmountFieldArgs<T>;
}

interface SetFieldValueAction<T = any> {
  type: "SET_FIELD_VALUE";
  config: SetFieldValueArgs<T>;
}

interface BlurFieldAction<T = any> {
  type: "BLUR_FIELD";
  config: BlurFieldArgs<T>;
}

interface ValidateFieldAction<T = any> {
  type: "VALIDATE_FIELD";
  config: ValidateFieldArgs<T>;
}

interface ValidateFieldsAction {
  type: "VALIDATE_FIELDS";
}

type FormAction<T = any> =
  | MountFieldAction<T>
  | UnmountFieldAction<T>
  | SetFieldValueAction<T>
  | BlurFieldAction<T>
  | ValidateFieldAction<T>
  | ValidateFieldsAction;

export const useForm = <T = any>(): FormState<T> => {
  const [fields, dispatch] = useReducer<Reducer<FieldsState<T>, FormAction<T>>>(
    (s, a) => {
      const newState = applyActionToState(s, a);

      return applyValidationToState(newState, a);
    },
    {} as FieldsState<T>
  );

  const mountField = useCallback<FormState<T>["mountField"]>(
    config => dispatch({ type: "MOUNT_FIELD", config: config as any }),
    [dispatch]
  );

  const unmountField = useCallback<FormState<T>["unmountField"]>(
    config => dispatch({ type: "UNMOUNT_FIELD", config }),
    [dispatch]
  );

  const setFieldValue = useCallback<FormState<T>["setFieldValue"]>(
    config => dispatch({ type: "SET_FIELD_VALUE", config }),
    [dispatch]
  );

  const blurField = useCallback<FormState<T>["blurField"]>(
    config => dispatch({ type: "BLUR_FIELD", config: config as any }),
    [dispatch]
  );

  const validateField = useCallback<FormState<T>["validateField"]>(
    config => dispatch({ type: "VALIDATE_FIELD", config }),
    [dispatch]
  );

  const validateFields = useCallback<FormState<T>["validateFields"]>(
    () => dispatch({ type: "VALIDATE_FIELDS" }),
    []
  );

  const mountedFields = useMemo(
    () =>
      Object.values(fields as FieldsState).filter(
        f => !(f === undefined || !f._isActive)
      ) as FieldState[],
    [fields]
  );
  const isValid = useMemo(() => mountedFields.every(f => f.isValid), [
    mountedFields
  ]);

  const isValidating = useMemo(() => mountedFields.some(f => f.isValidating), [
    mountedFields
  ]);

  return useMemo(
    () => ({
      fields,
      mountField,
      unmountField,
      setFieldValue,
      blurField,
      validateField,
      validateFields,
      isValid,
      isValidating
    }),
    [fields, mountField, unmountField, isValid, isValidating]
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
  if (
    ![
      "SET_FIELD_VALUE",
      "BLUR_FIELD",
      "VALIDATE_FIELD",
      "VALIDATE_FIELDS"
    ].includes(a.type)
  ) {
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
    const validateField =
      a.type === "VALIDATE_FIELD" && a.config.name === field.name;
    const validateFields = a.type === "VALIDATE_FIELDS";

    if (
      !(
        validateBlur ||
        validateChange ||
        validateUpdate ||
        validateField ||
        validateFields
      )
    ) {
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

export interface UnmountFieldArgs<T = any> {
  name: keyof T & string;
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
    return Object.entries(fields).reduce(
      (state, [key, value]) =>
        key === name ? state : { ...state, [key]: value },
      {}
    );
  }

  return {
    ...fields,
    [name]: {
      ...p,
      _isActive: false
    }
  };
};

export interface SetFieldValueArgs<
  T = any,
  K extends keyof T & string = keyof T & string
> {
  name: K;
  value: SetStateAction<T[K]>;
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
      value: typeof value === "function" ? (value as any)(p) : value
    }
  };
};

export interface BlurFieldArgs<
  T = any,
  K extends keyof T & string = keyof T & string
> {
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

export interface ValidateFieldArgs<
  T = any,
  K extends keyof T & string = keyof T & string
> {
  name: K;
}
