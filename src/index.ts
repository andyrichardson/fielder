import {
  createContext,
  Context,
  FC,
  useState,
  useContext,
  SetStateAction
} from "react";
import { Schema } from "yup";

interface CreateFormContextArgs<T> {
  values?: T;
  validation?: Schema<T>;
}

interface FormContextShape<T> {
  values?: T;
  schema: Schema<T>;
  setValues: SetStateAction<T>;
  setSchema: SetStateAction<Schema<T>>;
}

type FormContext<T> = Context<FormContextShape<T>> & {
  initialValues: CreateFormContextArgs<T>;
};

export const createFormContext = <T = any>(arg?: CreateFormContextArgs<T>) => {
  const c = (createContext(arg) as unknown) as FormContext<T>;
  c.initialValues = { ...arg };
  return c;
};

interface FormProviderProps<T> {
  context: FormContext<T>;
}

export const FormProvider: FC<FormProviderProps<any>> = ({ context }) => {
  const [values, setValues] = useState(context.initialValues.values);
  const [validation, setValidation] = useState(
    context.initialValues.validation
  );

  return null;
};

type Prop<V, K extends keyof V> = V[K];

type KeyValue<V, K extends keyof V = keyof V> = [keyof V, V[keyof V]];

type PropMap<
  C,
  K1 extends keyof C = keyof C,
  K2 extends keyof C[K1] = C[K1] extends object ? keyof C[K1] : never
> = PropMap2<C, K1, K2>;

type PropMap1<C, K1 extends keyof C = keyof C> = [K1];

// type PropMap2<C> = [PropMap1<C>[0], PropMap1<Prop<C, PropMap1<C>[0]>>[0]];

// type PropMap2<
//   C,
//   K1 extends keyof C = keyof C,
//   K2 extends keyof C[K1] = keyof C[K1]
// > = C[K1] extends object ? [K1, K2];

type PropMap2<
  C,
  K1 extends keyof C = keyof C,
  K2 extends keyof C[K1] = keyof C[K1]
> = [K1, K2];

type PropMapValue<T, M extends PropMap<T>> = M extends PropMap1<T>
  ? Prop<T, M[0]>
  : M extends PropMap2<T>
  ? Prop<Prop<T, M[0]>, M[1]>
  : never;

interface UseFieldArgs<T> {
  property: PropMap1<T> | PropMap2<T>;
}

const getProp = <V, P extends PropMap<V>>(o: V, p: P): PropMapValue<V, P> =>
  // @ts-ignore
  p.reduce((a, b) => a[b], o);

type UseFieldResponse<T, A extends UseFieldArgs<T>> = UseFieldResponseObject<
  PropMapValue<T, A["property"]>
>;

interface UseFieldResponseObject<T> {
  value: T;
}

export const useField = <T, A extends UseFieldArgs<T>>(
  context: FormContext<T>,
  { property }: A
): UseFieldResponse<T, A> => {
  const { values } = useContext(context);

  if (values === undefined) {
    throw Error();
  }

  return {
    value: getProp(values, property) as any
  };
};

const obj = {
  arg: {
    prop: "1234"
  },
  test: ""
};

const x: PropMap<typeof obj> = ["arg", "arg"];
