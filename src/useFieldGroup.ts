import { useFormContext, FielderContext } from './context';
import {
  FieldGroupConfig,
  FieldsState,
  FormState,
  FieldState,
  FieldConfig,
} from './types';
import {
  FormAction,
  applyActionToState,
  createHandleAsyncValidation,
  applyValidationToState,
} from './useForm';
import {
  useRef,
  useMemo,
  useCallback,
  Dispatch,
  useReducer,
  Reducer,
  useLayoutEffect,
  useContext,
} from 'react';

export const useFieldGroup = <T = any>({
  name: initialName,
  validate,
  initialValid = !validate,
  initialError = undefined,
  initialValue = [] as any,
  validateOnBlur = true,
  validateOnChange = true,
  validateOnUpdate = false,
  destroyOnUnmount = false,
}: FieldConfig<T>) => {
  const fieldsRef = useRef<FieldsState<T>>({});
  const destroyRef = useRef(destroyOnUnmount);
  const keyRef = useRef<Record<string, number>>({});
  const dispatchRef = useRef<Dispatch<FormAction<T>>>();
  const form = useContext(FielderContext);

  const name = useMemo(() => initialName, []);

  useMemo(() => (destroyRef.current = destroyOnUnmount), [destroyOnUnmount]);

  const handleAsyncValidation = useMemo(
    () => createHandleAsyncValidation(dispatchRef),
    []
  );

  const field = useMemo(
    () =>
      form.fields[name] || {
        name,
        error: initialError,
        valid: initialValid,
        value: initialValue,
        hasBlurred: false,
        hasChanged: false,
      },
    [form.fields, name]
  );

  useLayoutEffect(() => {
    if (form.fields[name] && form.fields[name]._isActive) {
      console.warn(
        'Fielder warning: Duplicate field mounted.\nSee this issue for more info https://github.com/andyrichardson/fielder/issues/44'
      );
    }

    form.mountField({
      name,
      initialError,
      initialValid,
      initialValue,
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnUpdate,
    } as any);

    return () => form.unmountField({ name, destroy: destroyRef.current });
  }, []);

  const incrementKey = useCallback((name: string) => {
    if (keyRef.current[name] === undefined) {
      keyRef.current[name] = 0;
      return keyRef.current[name];
    }

    return ++keyRef.current[name];
  }, []);

  const initialLocalValue = useMemo(() => {
    if (!Array.isArray(field.value)) {
      return [];
    }

    return field.value.reduce(
      (p, c) => ({
        ...p,
        ...Object.keys(c).reduce(
          (pp, key) => ({
            ...pp,
            [`${incrementKey(key)}.${key}`]: c[key],
          }),
          {}
        ),
      }),
      {}
    );
  }, []);

  const [fields, dispatch] = useReducer<Reducer<FieldsState<T>, FormAction<T>>>(
    (state, action) => {
      const newState = applyActionToState(state, action);

      return applyValidationToState(newState, action, handleAsyncValidation);
    },
    initialLocalValue
  );

  useMemo(() => (fieldsRef.current = fields), [fields]);

  const mountField = useCallback<FormState<T>['mountField']>(
    ({ name, ...config }) => {
      if (!keyRef.current[name]) {
        keyRef.current[name] = 0;
      }

      const newName = `${keyRef.current[name]++}.${name}`;
      dispatch({
        type: 'MOUNT_FIELD',
        config: { ...config, name: newName } as any,
      });
      return newName;
    },
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

  const blurField = useCallback<FormState<T>['blurField']>(
    (config) => dispatch({ type: 'BLUR_FIELD', config: config as any }),
    [dispatch]
  );

  const validateField = useCallback<FormState<T>['validateField']>(
    (config) => dispatch({ type: 'VALIDATE_FIELD', config }),
    [dispatch]
  );

  const isValid = useMemo(
    () => (Object.values(fields) as FieldState[]).every((f) => f.isValid),
    [fields]
  );

  return useMemo(
    () => ({
      fields,
      mountField,
    }),
    [mountField, fields]
  );
};
