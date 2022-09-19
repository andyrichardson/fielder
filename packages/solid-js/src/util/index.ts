import { StoreDispatch, StoreResolver } from '@fielder/core';
import { createSignal } from 'solid-js';

export const useSynchronousReducer = <T extends Record<string, any>, A>(
  resolver: StoreResolver<T, A>,
  initial: T
) => {
  const [state, setState] = createSignal(initial);
  const dispatch: StoreDispatch<A, T> = (action) =>
    setState((s) => resolver(s, action, dispatch));
  return [state, dispatch] as const;
};
