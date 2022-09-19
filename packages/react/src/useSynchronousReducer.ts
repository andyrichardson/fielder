import { useState, useCallback, useRef } from 'react';

export const useSynchronousReducer = <S, A>(
  reducer: (s: S, a: A) => S,
  initialState: S
) => {
  const stateRef = useRef(initialState);
  const [state, setState] = useState<S>(stateRef.current);

  const dispatch = useCallback<(a: A) => S>((action) => {
    stateRef.current = reducer(stateRef.current, action, dispatch);
    setState(stateRef.current);
    return stateRef.current;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, dispatch] as const;
};
