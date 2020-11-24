import {
  useContext,
  ChangeEvent,
  useCallback,
  useMemo,
  useLayoutEffect,
  useRef,
} from 'react';
import { FielderContext } from './context';
import {
  FormState,
  FieldState,
  FormSchemaType,
  ObjectValidation,
  ValidationFn,
} from './types';

export type UseFieldProps<T = any> = {
  /** Field name. */
  readonly name: string;
  /** Field value. */
  readonly value: T;
  /** Change event handler. */
  readonly onChange: (e: ChangeEvent | T) => void;
  /** Blur event handler (sets blurred state). */
  readonly onBlur: () => void;
};

export type UseFieldMeta = {
  /** Field error. */
  readonly error?: FieldState['error'];
  /** Field is currently valid. */
  readonly isValid: FieldState['isValid'];
  /** Field is currently being validated (async). */
  readonly isValidating: FieldState['isValidating'];
  /** Field has been blurred since mount. */
  readonly hasBlurred: FieldState['hasBlurred'];
  /** Field has been changed since mount. */
  readonly hasChanged: FieldState['hasChanged'];
};

export type UseFieldArgs<
  T extends FormSchemaType = any,
  K extends keyof T = keyof T
> = {
  /** Unique identifier for field. */
  readonly name: K;
  /** Validation function (throws errors). */
  readonly validate?: ObjectValidation<T, K> | ValidationFn<T, K>;
  /** Starting value. */
  readonly initialValue?: T[K];
  /** Should destroy value when useField hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
};

export type UseFieldResponse = readonly [UseFieldProps, UseFieldMeta];

export const useField = <T extends FormSchemaType = any>({
  name: initialName,
  validate,
  initialValue = undefined,
  destroyOnUnmount = false,
}: UseFieldArgs<T>): UseFieldResponse => {
  const destroyRef = useRef(destroyOnUnmount);
  const initialMount = useRef(true);
  const {
    fields,
    blurField,
    mountField,
    unmountField,
    setFieldValue,
    setFieldValidation,
  } = useContext<FormState<T>>(FielderContext);

  const name = useMemo(() => initialName, []);
  const field = useMemo(() => {
    if (initialMount.current) {
      return mountField({
        name,
        initialValue,
        validate,
      });
    }

    return fields[name];
  }, [fields]);

  useLayoutEffect(
    () => () => {
      initialMount.current = false;
    },
    []
  );

  useMemo(() => (destroyRef.current = destroyOnUnmount), [destroyOnUnmount]);

  useLayoutEffect(
    () => () => {
      unmountField({ name, destroy: destroyRef.current });
    },
    []
  );

  /** Update field state on validation config change. */
  useLayoutEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setFieldValidation({ name, validation: validate });
  }, [validate, name, setFieldValidation]);

  const onBlur = useCallback(() => blurField({ name }), [blurField]);

  const onChange = useCallback<UseFieldProps['onChange']>(
    (e) => {
      const value =
        typeof e === 'object' && 'currentTarget' in e
          ? e.currentTarget.value
          : e;

      return setFieldValue({
        name,
        value: (previousValue: any) => {
          if (!Array.isArray(previousValue)) {
            return value;
          }

          return previousValue.includes(value)
            ? previousValue.filter((v) => v !== value)
            : [...previousValue, value];
        },
      });
    },
    [setFieldValue]
  );

  const { value, error, isValid, isValidating, hasChanged, hasBlurred } = field;

  return useMemo(
    () => [
      { name, value, onBlur, onChange },
      { error, isValid, isValidating, hasBlurred, hasChanged },
    ],
    [
      value,
      onBlur,
      onChange,
      name,
      error,
      isValid,
      isValidating,
      hasChanged,
      hasBlurred,
    ]
  );
};
