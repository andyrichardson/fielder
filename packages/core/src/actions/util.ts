import { FieldsState, FormAction, Ref } from '../types';
import { doBlurField } from './blurField';
import { doMountField } from './mountField';
import { doSetFieldState } from './setFieldState';
import { doSetFieldValidation } from './setFieldValidation';
import { doSetFieldValue } from './setFieldValue';
import { StoreDispatch } from './types';
import { doUnmountField } from './unmountField';

export type ActionHandler<
  T extends { type: string; config?: any },
  Config = T extends { config: infer C } ? C : never
> = (state: FieldsState) => (args: Config) => FieldsState;

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

  if (a.type === 'SET_FIELD_VALIDATION') {
    return doSetFieldValidation(s)(a.config);
  }

  return s;
};

type HandleAsyncValidationClosure = {
  dispatch: StoreDispatch<FormAction>;
  promisesRef: Ref<Record<string, Promise<any>>>;
};

type HandleAsyncValidationArgs = {
  /** Name of field associated w/ promise */
  name: string;
  promise: Promise<any>;
};

/** Tracks async validation per field and updates state on completion. */
export const createHandleAsyncValidation = ({
  dispatch,
  promisesRef,
}: HandleAsyncValidationClosure) => ({
  name,
  promise,
}: HandleAsyncValidationArgs) => {};

{
  let promises: Record<string, Promise<any>> = {};

  return (name: string, validationPromise: Promise<any>) => {
    // Add promise to collection
    promises = {
      ...promises,
      [name]: validationPromise,
    };

    const validationCallback = (isError: boolean) => (response: any) => {
      if (!dispatch || !dispatch.current) {
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
          state: (s: any) => ({
            ...s,
            isValidating: false,
            isValid,
            error: isValid ? undefined : response.message,
          }),
        },
      });
    };

    validationPromise
      .then(validationCallback(false))
      .catch(validationCallback(true));
  };
}
