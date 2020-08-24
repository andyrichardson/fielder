import {
  useReducer,
  Reducer,
  useCallback,
  useMemo,
  SetStateAction,
  Dispatch,
  useRef,
  MutableRefObject,
} from 'react';
import { FormState, FieldState, FieldConfig, FieldsState } from './types';
import { boolean } from 'yup';

/** Adds a field to the form. */
interface MountFieldAction<T = any> {
  type: 'MOUNT_FIELD';
  config: FieldConfig<T>;
}

/** Removes a field to the form or sets it as inactive. */
interface UnmountFieldAction<T = any> {
  type: 'UNMOUNT_FIELD';
  config: UnmountFieldArgs<T>;
}

/** Sets the value of a field (may trigger validation). */
interface SetFieldValueAction<T = any> {
  type: 'SET_FIELD_VALUE';
  config: SetFieldValueArgs<T>;
}

/** Sets a field to having been touched. */
interface BlurFieldAction<T = any> {
  type: 'BLUR_FIELD';
  config: BlurFieldArgs<T>;
}

/** Force validation to be called on a given field. */
interface ValidateFieldAction<T = any> {
  type: 'VALIDATE_FIELD';
  config: ValidateFieldArgs<T>;
}

/** Force validation to be called on all fields. */
interface ValidateFieldsAction {
  type: 'VALIDATE_FIELDS';
}

/** Set state of a field (without triggering validation). */
interface SetFieldStateAction<T = any> {
  type: 'SET_FIELD_STATE';
  config: SetFieldStateArgs<T>;
}

export type FormAction<T = any> =
  | MountFieldAction<T>
  | UnmountFieldAction<T>
  | SetFieldValueAction<T>
  | BlurFieldAction<T>
  | ValidateFieldAction<T>
  | ValidateFieldsAction
  | SetFieldStateAction<T>;

export const useForm = <T = any>(): FormState<T> => {
  const dispatchRef = useRef<Dispatch<FormAction<T>>>();

  const handleAsyncValidation = useMemo(
    () => createHandleAsyncValidation(dispatchRef),
    []
  );

  const [fields, dispatch] = useReducer<Reducer<FieldsState<T>, FormAction<T>>>(
    (state, action) => {
      const newState = applyActionToState(state, action);

      return applyValidationToState(newState, action, handleAsyncValidation);
    },
    {} as FieldsState<T>
  );

  useMemo(() => (dispatchRef.current = dispatch), [dispatch]);

  const mountField = useCallback<FormState<T>['mountField']>(
    (config) => dispatch({ type: 'MOUNT_FIELD', config: config as any }),
    [dispatch]
  );

  const unmountField = useCallback<FormState<T>['unmountField']>(
    (config) => dispatch({ type: 'UNMOUNT_FIELD', config }),
    [dispatch]
  );

  const setFieldValue = useCallback<FormState<T>['setFieldValue']>(
    (config) => dispatch({ type: 'SET_FIELD_VALUE', config }),
    [dispatch]
  );

  const setFieldState = useCallback<FormState<T>['setFieldState']>(
    (config) => dispatch({ type: 'SET_FIELD_STATE', config }),
    [dispatch]
  );

  const blurField = useCallback<FormState<T>['blurField']>(
    (config) => dispatch({ type: 'BLUR_FIELD', config: config as any }),
    [dispatch]
  );

  const validateField = useCallback<FormState<T>['validateField']>(
    (config) => dispatch({ type: 'VALIDATE_FIELD', config }),
    [dispatch]
  );

  const validateFields = useCallback<FormState<T>['validateFields']>(
    () => dispatch({ type: 'VALIDATE_FIELDS' }),
    []
  );

  const mountedFields = useMemo(
    () =>
      Object.values(fields as FieldsState).filter(
        (f) => !(f === undefined || !f._isActive)
      ) as FieldState[],
    [fields]
  );

  const isValid = useMemo(() => mountedFields.every((f) => f.isValid), [
    mountedFields,
  ]);

  const isValidating = useMemo(
    () => mountedFields.some((f) => f.isValidating),
    [mountedFields]
  );

  return useMemo(
    () => ({
      fields,
      isValid,
      isValidating,
      setFieldValue,
      blurField,
      validateField,
      validateFields,
      mountField,
      unmountField,
      setFieldState,
    }),
    [
      fields,
      isValid,
      isValidating,
      setFieldValue,
      blurField,
      validateField,
      validateFields,
      mountField,
      unmountField,
      setFieldState,
    ]
  );
};

/** Triggers primary action to state. */
export const applyActionToState = (s: FieldsState, a: FormAction) => {
  if (a.type === 'MOUNT_FIELD') {
    return doMountField(s)(a.config);
  }

  if (a.type === 'UNMOUNT_FIELD') {
    return doUnmountField(s)(a.config);
  }

  if (a.type === 'SET_FIELD_VALUE') {
    return doSetFieldValue(s)(a.config);
  }

  if (a.type === 'BLUR_FIELD') {
    return doBlurField(s)(a.config);
  }

  if (a.type === 'SET_FIELD_STATE') {
    return doSetFieldState(s)(a.config);
  }

  return s;
};

/** Tracks async validation and updates state on completion. */
export const createHandleAsyncValidation = <T>(
  dispatch: MutableRefObject<Dispatch<FormAction<T>> | undefined>
) => {
  let promises: Record<string, number> = {};

  return (name: keyof T, validationPromise: Promise<any>) => {
    // Set new UUID for validaiton call
    const promiseId = promises[name] !== undefined ? promises[name] + 1 : 0;
    promises = {
      ...promises,
      [name]: promiseId,
    };

    const validationCallback = (isError: boolean) => (response: any) => {
      if (!dispatch || dispatch.current === undefined) {
        console.warn(
          'Unable to update validation state. Dispatch not available.'
        );
        return;
      }

      // Newer validation promise has been called
      if (promises[name] !== promiseId) {
        return;
      }

      const isValid = !isError && !response;

      dispatch.current({
        type: 'SET_FIELD_STATE',
        config: {
          name,
          state: (s) => ({
            ...s,
            isValidating: false,
            isValid,
            error: response,
          }),
        },
      });
    };

    validationPromise
      .then(validationCallback(false))
      .catch(validationCallback(true));
  };
};

/** Triggers validation on fields items. */
export const applyValidationToState = (
  state: FieldsState,
  action: FormAction,
  handleAsyncValidation: (name: any, promise: Promise<any>) => void
): FieldsState => {
  if (
    ![
      'SET_FIELD_STATE',
      'SET_FIELD_VALUE',
      'BLUR_FIELD',
      'VALIDATE_FIELD',
      'VALIDATE_FIELDS',
    ].includes(action.type)
  ) {
    return state;
  }

  return Object.keys(state).reduce((state, key) => {
    const field = state[key];

    if (field === undefined || !field._isActive || !field._validate) {
      return state;
    }

    const validateBlur =
      // Blur field
      action.type === 'BLUR_FIELD' &&
      // Matching field
      action.config.name === field.name &&
      // Should validate
      field._validateOnBlur;

    const validateChange =
      // Set field value (change)
      action.type === 'SET_FIELD_VALUE' &&
      // Matching field
      action.config.name === field.name &&
      // Should validate
      field._validateOnChange;

    const validateUpdate =
      // Set field value (change)
      action.type === 'SET_FIELD_VALUE' &&
      // Should validate (any change event)
      field._validateOnChange;

    const validateSetFieldState =
      // Set field state
      action.type === 'SET_FIELD_STATE' &&
      // Matching field
      action.config.name === field.name &&
      // Validation requested (boolean)
      (action.config.validate === true ||
        // Validation requested (function)
        (typeof action.config.validate === 'function' &&
          action.config.validate(field)));

    const validateField =
      // Validate field
      action.type === 'VALIDATE_FIELD' &&
      // Matching field
      action.config.name === field.name;

    const validateFields =
      // Validate all fields
      action.type === 'VALIDATE_FIELDS';

    if (
      !(
        validateBlur ||
        validateChange ||
        validateUpdate ||
        validateSetFieldState ||
        validateField ||
        validateFields
      )
    ) {
      return state;
    }

    try {
      const validateResponse = field._validate(field.value, state) as any;

      if (!(validateResponse instanceof Promise)) {
        return {
          ...state,
          [key]: {
            ...field,
            isValid: true,
            isValidating: false,
            error: undefined,
          },
        };
      }

      handleAsyncValidation(field.name, validateResponse);

      return {
        ...state,
        [key]: {
          ...field,
          isValidating: true,
        },
      };
    } catch (err) {
      return {
        ...state,
        [key]: {
          ...field,
          isValid: false,
          isValidating: false,
          error: err && err.message ? err.message : err,
        },
      };
    }
  }, state);
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
  initialTouched = false,
}: FieldConfig): FieldsState => {
  const p = fields[name as string] || ({} as FieldState);

  if (p && p._isActive) {
    throw Error('Field is already mounted');
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
      touched: p.touched || initialTouched,
      hasBlurred: false,
      hasChanged: false,
    },
  };
};

export interface UnmountFieldArgs<T = any> {
  name: keyof T & string;
  destroy?: boolean;
}

/** Unmount of field. */
const doUnmountField = (fields: FieldsState) => ({
  name,
  destroy = false,
}: UnmountFieldArgs): FieldsState => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
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
      _isActive: false,
    },
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
  value,
}: SetFieldValueArgs<T>): FieldsState => {
  const p = fields[name as string];

  if (p === undefined) {
    throw Error('Cannot set value on non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field value for inactive field.');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      value: typeof value === 'function' ? (value as any)(p.value) : value,
      hasChanged: true,
    },
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
  name,
}: BlurFieldArgs): FieldsState => {
  const p = fields[name];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field attribute on inactive field.');
  }

  return {
    ...fields,
    [name]: {
      ...p,
      touched: true,
      hasBlurred: true,
    },
  };
};

export interface SetFieldStateArgs<
  T = any,
  K extends keyof T & string = keyof T & string
> {
  name: K;
  state: SetStateAction<FieldState<T[K]>>;
  validate?: ((state: FieldState<T[K]>) => boolean) | boolean;
}

const doSetFieldState = (fields: FieldsState) => <T>({
  name,
  state,
}: SetFieldStateArgs<T>) => {
  const p = fields[name];

  if (p === undefined) {
    throw Error('Cannot unmount non-mounted field');
  }

  if (!p._isActive) {
    console.warn('Setting field attribute on inactive field.');
  }

  const newState = typeof state === 'function' ? state(p) : state;

  /** Same object reference was returned. */
  if (newState === p) {
    return fields;
  }

  return {
    ...fields,
    [name]: newState,
  };
};

export interface ValidateFieldArgs<
  T = any,
  K extends keyof T & string = keyof T & string
> {
  name: K;
}
