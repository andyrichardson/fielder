import { useCallback, useContext, useMemo, useState } from 'react';
import { FieldsState } from './types';
import { FielderContext } from './context';

type UseSubmitResponse = {
  /** Indicates when async `submit` validation is in progress. */
  isValidating: boolean;
  /**
   * Is set to true immediately upon call of the handleSubmit function.
   *
   * _Does not imply the form is valid or that submit validation was successful_
   **/
  hasSubmitted: boolean;
  /**
   * Wrapper for provided submit function.
   */
  handleSubmit: () => void;
};

/**
 * Wrapper utility for triggering submission validation.
 *
 * - Constructs values object to provided submission function
 * - Guards submission function until sync/async validation has completed
 * - Indicates state of submission
 */
export const useSubmit = <T extends Record<string, any>>(
  /** A handler for  */
  handler: (values: T) => void
): UseSubmitResponse => {
  const [state, setState] = useState({
    isValidating: false,
    hasSubmitted: false,
  });
  const { validateSubmission } = useContext(FielderContext);

  const handleSubmit = useCallback(async () => {
    const possibleProm = validateSubmission();
    setState({
      isValidating: possibleProm instanceof Promise,
      hasSubmitted: true,
    });

    const { state, errors } = await possibleProm;
    setState((s) => ({ ...s, isValidating: false }));

    // No errors - call submit handler
    if (Object.keys(errors).length === 0) {
      handler(stateToValues(state) as T);
    }
  }, [validateSubmission, handler]);

  return useMemo(() => ({ ...state, handleSubmit } as const), [
    state,
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
