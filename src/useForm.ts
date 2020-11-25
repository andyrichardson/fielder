import {
  useReducer,
  Reducer,
  useCallback,
  useMemo,
  Dispatch,
  useRef,
  MutableRefObject,
} from 'react';
import { FormState, FieldState, FieldsState, FormSchemaType } from './types';
import { BlurFieldAction, doBlurField } from './actions/blurField';
import { MountFieldAction, doMountField } from './actions/mountField';
import { SetFieldStateAction, doSetFieldState } from './actions/setFieldState';
import {
  SetFieldValidationAction,
  doSetFieldValidation,
} from './actions/setFieldValidation';
import { SetFieldValueAction, doSetFieldValue } from './actions/setFieldValue';
import { UnmountFieldAction, doUnmountField } from './actions/unmountField';
import { ValidateFieldAction } from './actions/validateField';
import { ValidateSubmissionAction } from './actions/validateSubmission';
import { applyValidationToState } from './validation/applyValidationToState';
import { batchValidationErrors } from './validation/batchValidationErrors';
import { useSynchronousReducer } from './useSynchronousReducer';

export type FormAction =
  | BlurFieldAction
  | MountFieldAction
  | SetFieldStateAction
  | SetFieldValidationAction
  | SetFieldValueAction
  | UnmountFieldAction
  | ValidateFieldAction
  | ValidateSubmissionAction;

export const useForm = <T extends FormSchemaType = any>(): FormState<T> => {
  /** Async validation promise updated synchronously after every dispatch. */
  const promiseRef = useRef<Record<string, Promise<any>> | undefined>();
  /** Reference to dispatch for forwarding closure. */
  const dispatchRef = useRef<Dispatch<FormAction>>();

  const handleAsyncValidation = useMemo(
    () => createHandleAsyncValidation(dispatchRef),
    []
  );

  const [fields, dispatch] = useSynchronousReducer<FieldsState<T>, FormAction>(
    (state, action) => {
      const newState = applyActionToState(state, action);
      const { state: validatedState, promises } = applyValidationToState(
        newState,
        action
      );

      if (Object.keys(promises).length > 0) {
        // Maybe we should batch async updates caused by a single action
        Object.entries(promises).map(([name, promise]) =>
          handleAsyncValidation(name, promise)
        );
      }

      promiseRef.current = promises;
      return validatedState;
    },
    {} as FieldsState<T>
  );

  useMemo(() => (dispatchRef.current = dispatch), [dispatch]);

  /** Retrieves field state for initial mount (before mounted field is added to state) */
  const premountField = useCallback<FormState<T>['premountField']>(
    (config) => {
      const action = {
        type: 'MOUNT_FIELD',
        config,
      } as const;

      const newState = applyActionToState(fields, action);
      const { state: validatedState } = applyValidationToState(
        newState,
        action
      );

      // Throw away async validation on mount and
      // wait for mountField call during commit

      return validatedState[config.name] as any;
    },
    [fields]
  );

  const mountField = useCallback<FormState<T>['mountField']>(
    (config) => dispatch({ type: 'MOUNT_FIELD', config })[config.name] as any,
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
    (config) => dispatch({ type: 'BLUR_FIELD', config: config }),
    [dispatch]
  );

  const setFieldValidation = useCallback<FormState<T>['setFieldValidation']>(
    (config) => dispatch({ type: 'SET_FIELD_VALIDATION', config }),
    [dispatch]
  );

  const validateField = useCallback<FormState<T>['validateField']>(
    (config) => dispatch({ type: 'VALIDATE_FIELD', config }),
    [dispatch]
  );

  const validateSubmission = useCallback<
    FormState<T>['validateSubmission']
  >(() => {
    const newState = dispatch({ type: 'VALIDATE_SUBMISSION' });
    const errors = batchValidationErrors({
      state: newState,
      promises: promiseRef.current,
    });

    if (errors instanceof Promise) {
      return errors.then((errors) => ({
        state: newState,
        errors,
      }));
    }

    return {
      state: newState,
      errors,
    };
  }, []);

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
      premountField,
      setFieldValue,
      blurField,
      validateField,
      validateSubmission,
      mountField,
      unmountField,
      setFieldState,
      setFieldValidation,
    }),
    [
      fields,
      isValid,
      isValidating,
      premountField,
      setFieldValue,
      blurField,
      validateField,
      validateSubmission,
      mountField,
      unmountField,
      setFieldState,
      setFieldValidation,
    ]
  );
};

/** Triggers primary action to state. */
const applyActionToState = (s: FieldsState, a: FormAction) => {
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

  if (a.type === 'SET_FIELD_VALIDATION') {
    return doSetFieldValidation(s)(a.config);
  }

  return s;
};

/** Tracks async validation per field and updates state on completion. */
const createHandleAsyncValidation = (
  dispatch: MutableRefObject<Dispatch<FormAction> | undefined>
) => {
  let promises: Record<string, Promise<any>> = {};

  return (name: string, validationPromise: Promise<any>) => {
    // Add promise to collection
    promises = {
      ...promises,
      [name]: validationPromise,
    };

    const validationCallback = (isError: boolean) => (response: any) => {
      if (!dispatch || dispatch.current === undefined) {
        console.warn(
          'Unable to update validation state. Dispatch not available.'
        );
        return;
      }

      // Newer validation promise has been called
      if (promises[name] !== validationPromise) {
        return;
      }

      const isValid = !isError;

      dispatch.current({
        type: 'SET_FIELD_STATE',
        config: {
          name,
          state: (s) => ({
            ...s,
            isValidating: false,
            isValid,
            error: response.message,
          }),
        },
      });
    };

    validationPromise
      .then(validationCallback(false))
      .catch(validationCallback(true));
  };
};
