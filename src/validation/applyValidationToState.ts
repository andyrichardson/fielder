import { FieldsState, FieldState, ValidationTrigger } from '../types';
import { FormAction } from '../useForm';

/** Triggers validation on fields items. */
export const applyValidationToState = (
  state: FieldsState,
  action: FormAction
) => {
  return Object.keys(state).reduce<{
    state: FieldsState;
    promises: Record<string, Promise<any>>;
  }>(
    ({ state, promises }, key) => {
      const field = state[key];
      const validationTrigger = getValidationTriggerForField(action, field);
      const validationFn = getFieldValidationFn(validationTrigger, field);

      if (!validationFn) {
        return { state, promises };
      }

      try {
        const validateResponse = validationFn({
          trigger: validationTrigger,
          value: field.value,
          form: state,
        });

        if (validateResponse instanceof Promise) {
          return {
            promises: {
              ...promises,
              [key]: validateResponse,
            },
            state: {
              ...state,
              [key]: {
                ...field,
                isValidating: true,
              },
            },
          };
        }

        return {
          promises,
          state: {
            ...state,
            [key]: {
              ...field,
              isValid: true,
              isValidating: false,
              error: undefined,
            },
          },
        };
      } catch (err) {
        return {
          promises,
          state: {
            ...state,
            [key]: {
              ...field,
              isValid: false,
              isValidating: false,
              error: err && err.message ? err.message : err,
            },
          },
        };
      }
    },
    { state, promises: {} }
  );
};

const getFieldValidationFn = (
  trigger: ValidationTrigger | undefined,
  field: FieldState
) => {
  if (!trigger) {
    return;
  }

  if (typeof field._validate === 'function') {
    return field._validate;
  }

  if (typeof field._validate === 'object') {
    return field._validate[trigger];
  }
};

/** Return trigger for validation on field (may be undefined) */
const getValidationTriggerForField = (
  action: FormAction,
  field: FieldState
) => {
  if (!field || !field._isActive || !field._validate) {
    return;
  }

  // Global change - applies to all
  if (action.type === 'VALIDATE_SUBMISSION') {
    return 'submit';
  }

  // Global change - applies to all
  if (action.type === 'SET_FIELD_VALUE' && action.config.name !== field.name) {
    return 'formChange';
  }

  // All other actions are field specific
  if (action.config.name !== field.name) {
    return;
  }

  if (action.type === 'MOUNT_FIELD') {
    return 'mount';
  }

  if (action.type === 'BLUR_FIELD') {
    return 'blur';
  }

  if (action.type === 'SET_FIELD_VALUE') {
    return 'change';
  }

  // On validation update - try to rerun latest field validation trigger
  if (action.type === 'SET_FIELD_VALIDATION' && field.hasBlurred) {
    return 'blur';
  }

  if (action.type === 'SET_FIELD_VALIDATION' && field.hasChanged) {
    return 'change';
  }

  if (action.type === 'SET_FIELD_VALIDATION') {
    return 'mount';
  }

  if (action.type === 'VALIDATE_FIELD') {
    return action.config.trigger || 'change';
  }
};
