import {
  useContext,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useLayoutEffect } from './util'
import { FielderContext } from './context';
import {
  FormState,
  FieldState,
  FormSchemaType,
  ObjectValidation,
  ValidationFn,
  FormValue,
} from './types';

export type UseFieldProps<T = any> = {
  /** Field name. */
  readonly name: string;
  /** Field value. */
  readonly value: T;
  /** Change event handler. */
  readonly onChange: (e: { currentTarget: { value: any } } | T) => void;
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
  S extends FormSchemaType = FormSchemaType,
  K extends keyof S = keyof S,
  V extends FormValue = S[K]
> = {
  /** Unique identifier for field. */
  readonly name: K;
  /** Starting value. */
  readonly initialValue: V;
  /** Validation function (throws errors). */
  readonly validate?: ObjectValidation<V, S> | ValidationFn<V, S>;
  /** Should destroy value when useField hook is unmounted. */
  readonly destroyOnUnmount?: boolean;
};

export type UseFieldResponse = readonly [UseFieldProps, UseFieldMeta];

export const useField = <T extends FormSchemaType = FormSchemaType>({
  name,
  validate,
  initialValue,
  destroyOnUnmount = false,
}: UseFieldArgs<T>): UseFieldResponse => {
  const destroyRef = useRef(destroyOnUnmount);
  const initialMount = useRef(true);
  const {
    fields,
    blurField,
    premountField,
    mountField,
    unmountField,
    setFieldValue,
    setFieldValidation,
  } = useContext<FormState<any>>(FielderContext);

  // Set unchanging initial values
  const initial = useMemo(() => ({ name, value: initialValue, validate }), []); // eslint-disable-line

  const field = useMemo(() => {
    if (initialMount.current) {
      // Simulate mounting without committing to state
      return premountField({
        name: initial.name,
        initialValue: initial.value,
        validate: initial.validate,
      });
    }

    return fields[initial.name];
  }, [initial.name, initial.value, initial.validate, premountField, fields]);

  useLayoutEffect(() => {
    mountField({
      name: initial.name,
      initialValue: initial.value,
      validate: initial.validate,
    });
  }, [initial.name, initial.validate, initial.value, mountField]);

  useLayoutEffect(
    () => () => {
      initialMount.current = false;
    },
    []
  );

  useMemo(() => (destroyRef.current = destroyOnUnmount), [destroyOnUnmount]);

  useLayoutEffect(
    () => () => {
      unmountField({ name: initial.name, destroy: destroyRef.current });
    },
    [unmountField, initial.name]
  );

  /** Update field state on validation config change. */
  useLayoutEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setFieldValidation({ name: initial.name, validation: validate });
  }, [validate, initial.name, setFieldValidation]);

  const onBlur = useCallback(() => blurField({ name: initial.name }), [
    initial.name,
    blurField,
  ]);

  const onChange = useCallback<UseFieldProps['onChange']>(
    (e) => {
      // If initial value is boolean,
      // toggle value on change (i.e. checkbox)
      if (typeof initial.value === 'boolean') {
        return setFieldValue({
          name: initial.name,
          value: (v: boolean) => !v,
        });
      }

      const value =
        typeof e === 'object' && 'currentTarget' in e
          ? e.currentTarget.value
          : e;

      return setFieldValue({
        name: initial.name,
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
    [initial.name, initial.value, setFieldValue]
  );

  const { value, error, isValid, isValidating, hasChanged, hasBlurred } = field;

  return useMemo(
    () => [
      { name: initial.name, value, onBlur, onChange },
      { error, isValid, isValidating, hasBlurred, hasChanged },
    ],
    [
      initial.name,
      value,
      onBlur,
      onChange,
      error,
      isValid,
      isValidating,
      hasChanged,
      hasBlurred,
    ]
  );
};
