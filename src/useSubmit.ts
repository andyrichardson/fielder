import { useCallback, useContext, useMemo, useState } from 'react';
import { FieldsState } from './types';
import { FielderContext } from './context';

/** Wrapper for submit handler */
export const useSubmit = <T extends Record<string, any>>(
  handler: (values: T) => void
) => {
  const [fetching, setFetching] = useState(false);
  const { validateSubmission } = useContext(FielderContext);

  const handleSubmit = useCallback(async () => {
    const possibleProm = validateSubmission();
    if (possibleProm instanceof Promise) {
      setFetching(true);
    }

    const { state, errors } = await possibleProm;
    setFetching(false);

    // No errors - call submit handler
    if (Object.keys(errors).length === 0) {
      handler(stateToValues(state) as T);
    }
  }, [validateSubmission, handler]);

  return useMemo(() => [fetching, handleSubmit] as const, [
    fetching,
    handleSubmit,
  ]);
};

const stateToValues = (state: FieldsState) =>
  Object.entries(state).reduce(
    (acc, [key, field]) => ({
      ...acc,
      [key]: field.value,
    }),
    {}
  );
