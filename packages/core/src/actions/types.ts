export type StoreDispatch<A, T = any> = (action: A) => T;
export type StoreResolver<T, A> = (
  store: T,
  action: A,
  dispatch: StoreDispatch<A, T>
) => T;
