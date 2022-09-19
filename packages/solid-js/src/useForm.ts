import {
  FormSchemaType,
  FormOpts,
  FormState,
  FormAction,
  getFormStateFromValues,
  applyActionToState,
  applyValidationToState,
  Ref,
  FieldsState,
  batchValidationErrors,
  FieldState,
} from '@fielder/core';
import { Accessor, createMemo } from 'solid-js';
import { SolidFormState } from 'types';
import { useSynchronousReducer } from './util';

export const useForm = <T extends FormSchemaType = FormSchemaType>(
  opts: FormOpts = {}
): Accessor<SolidFormState<T>> => {
  // Validation promises tracked for submission guarding
  const promisesRef: Ref<Record<string, Promise<any>>> = {
    current: {},
  };

  const [fields, dispatch] = useSynchronousReducer<FieldsState, FormAction>(
    (state, action, dispatch) => {
      // Update state for non validation actions
      const newState = applyActionToState(state, action);

      // Call validation on new state
      const { state: validatedState, promises } = applyValidationToState(
        newState,
        action
      );

      // Update tracked promises
      promisesRef.current = promises;

      // Add listeners for promise completion
      const promiseEntries = Object.entries(promises);
      if (promiseEntries.length > 0) {
        promiseEntries.forEach(([name, promise]) =>
          Promise.allSettled([promise]).then(([result]) => {
            // Newer validation promise has been called
            if (promisesRef.current[name] !== promise) {
              return;
            }

            dispatch({
              type: 'SET_FIELD_STATE',
              config: {
                name,
                state: (s) => ({
                  ...s,
                  isValidating: false,
                  isValid: result.status === 'fulfilled',
                  error:
                    result.status === 'fulfilled'
                      ? undefined
                      : result.reason?.message,
                }),
              },
            });
          })
        );
      }

      return validatedState;
    },
    opts.fromState ? getFormStateFromValues(opts.fromState) : {}
  );

  const mountField: FormState<T>['mountField'] = (config) =>
    dispatch({ type: 'MOUNT_FIELD', config })[config.name] as any;

  const unmountField: FormState<T>['unmountField'] = (config) =>
    dispatch({ type: 'UNMOUNT_FIELD', config });

  const setFieldValue: FormState<T>['setFieldValue'] = (config) =>
    dispatch({ type: 'SET_FIELD_VALUE', config });

  const setFieldState: FormState<T>['setFieldState'] = (config) =>
    dispatch({ type: 'SET_FIELD_STATE', config });

  const blurField: FormState<T>['blurField'] = (config) =>
    dispatch({ type: 'BLUR_FIELD', config: config });

  const setFieldValidation: FormState<T>['setFieldValidation'] = (config) =>
    dispatch({ type: 'SET_FIELD_VALIDATION', config });

  const validateField: FormState<T>['validateField'] = (config) =>
    dispatch({ type: 'VALIDATE_FIELD', config });

  const validateSubmission: FormState<T>['validateSubmission'] = () => {
    const newState = dispatch({ type: 'VALIDATE_SUBMISSION' });
    const errors = batchValidationErrors({
      state: newState,
      promises: promisesRef.current,
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
  };

  /** Retrieves field state for initial mount (before mounted field is added to state) */
  const premountField: FormState<T>['premountField'] = (config) => {
    const action = {
      type: 'MOUNT_FIELD',
      config,
    } as const;

    const newState = applyActionToState(fields(), action);
    const { state: validatedState } = applyValidationToState(newState, action);

    // Throw away async validation on mount and
    // wait for mountField call during commit
    return validatedState[config.name] as any;
  };

  const mountedFields = createMemo(
    () =>
      Object.values(fields() as FieldsState).filter(
        (f) => !(f === undefined || !f._isActive)
      ) as FieldState[]
  );

  const isValid = createMemo(() => mountedFields().every((f) => f.isValid));

  const isValidating = createMemo(() =>
    mountedFields().some((f) => f.isValidating)
  );

  return {
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
  };
};
