import {
  useLayoutEffect as useLayoutEffectOriginal,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

export const useLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffectOriginal : useEffect;

type StoreDispatch<T, A> = (action: A) => T;
type StoreResolver<T, A> = (
  store: T,
  action: A,
  dispatch: StoreDispatch<T, A>
) => T;

export const useSynchronousReducer = <T, A>(
  resolver: StoreResolver<T, A>,
  initialState: T
) => {
  const stateRef = useRef(initialState);
  const [state, setState] = useState<S>(stateRef.current);

  const dispatch = useCallback<(a: A) => S>((action) => {
    stateRef.current = resolver(stateRef.current, action, dispatch);
    setState(stateRef.current);
    return stateRef.current;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, dispatch] as const;
};
