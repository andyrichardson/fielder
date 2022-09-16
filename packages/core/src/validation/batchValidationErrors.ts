import { FieldsState } from '../types';
/** Joins all validation errors (sync/async) into a single validation function */

export const batchValidationErrors = ({
  state,
  promises
}: {
  state: FieldsState;
  promises?: Record<string, Promise<any>>;
}) => {
  const syncErrors = getErrorsFromState(state);

  if (!promises || Object.keys(promises).length === 0) {
    return syncErrors;
  }

  return getErrorsFromPromises(promises).then(errs => cleanupKeys({ ...syncErrors,
    ...errs // Intentionally set some errors to undefined

  }));
};

const getErrorsFromState = (state: FieldsState) => Object.entries(state).reduce((errors, [name, field]) => {
  if (field._isActive && field.error) {
    return { ...errors,
      [name]: field.error
    };
  }

  return errors;
}, {});

const getErrorsFromPromises = async (promises: Record<string, Promise<any>>) => {
  const results = await Promise.all(Object.entries(promises).map<Promise<{
    key: string;
    error: string | undefined;
  }>>(([key, promise]) => promise.then(() => ({
    key,
    error: undefined
  })).catch(err => ({
    key,
    error: err.message
  }))));
  return results.reduce((errors, result) => ({ ...errors,
    [result.key]: result.error
  }), {});
};
/** Remove keys from object where value is undefined */


const cleanupKeys = (arg: object) => Object.entries(arg).reduce((acc, [key, value]) => {
  if (value === undefined) {
    return acc;
  }

  return { ...acc,
    [key]: value
  };
}, {});