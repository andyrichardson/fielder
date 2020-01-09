import {
  useContext,
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useMemo,
  useLayoutEffect
} from 'react';
import { FielderContext } from './context';
import { FormState, FieldState, FieldConfig } from './types';

export type UseFieldProps<T = any> = {
  readonly name: string;
  readonly value: T;
  readonly onChange: ChangeEventHandler;
  readonly onBlur: () => void;
};

export type UseFieldMeta = {
  readonly touched: FieldState['touched'];
  readonly error: FieldState['error'];
  readonly isValid: FieldState['isValid'];
  readonly isValidating: FieldState['isValidating'];
};

type SupportedElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLTextAreaElement;

export type UseFieldResponse = [UseFieldProps, UseFieldMeta];

export const useField = <T = any>({
  name: initialName,
  validate,
  initialValid = !validate,
  initialError = undefined,
  initialValue = undefined,
  initialTouched = false,
  validateOnBlur = true,
  validateOnChange = true,
  validateOnUpdate = false,
  destroyOnUnmount = false
}: FieldConfig<T>): UseFieldResponse => {
  const {
    fields,
    blurField,
    mountField,
    unmountField,
    setFieldValue
  } = useContext<FormState>(FielderContext);

  const name = useMemo(() => initialName, []);
  const field = useMemo(
    () =>
      fields[initialName] || {
        name,
        error: initialError,
        valid: initialValid,
        value: initialValue,
        touched: initialTouched
      },
    [fields]
  );

  useLayoutEffect(() => {
    if (fields[name] && fields[name]._isActive) {
      throw Error('Duplicate field mounted.');
    }

    mountField({
      name,
      initialError,
      initialValid,
      initialValue,
      initialTouched,
      validate,
      validateOnBlur,
      validateOnChange,
      validateOnUpdate
    });

    return () => unmountField({ name, destroy: destroyOnUnmount });
  }, [mountField]);

  const onBlur = useCallback(() => {
    blurField({ name });
  }, [blurField]);

  const onChange = useCallback<ChangeEventHandler<SupportedElements>>(
    e => {
      const type = getElementType(e);
      const newVal = e.currentTarget.value;

      if (type !== 'checkbox') {
        return setFieldValue({ name, value: newVal });
      }

      return setFieldValue({
        name,
        value: (value: any[]) => {
          if (value === undefined) {
            return [newVal];
          }

          return value.includes(newVal)
            ? value.filter(v => v !== newVal)
            : [...value, newVal];
        }
      });
    },
    [setFieldValue]
  );

  const { value, touched, error, isValid, isValidating } = field;

  return useMemo(
    () => [
      { name, value, onBlur, onChange },
      { touched, error, isValid, isValidating }
    ],
    [value, onBlur, onChange, name, touched, error, isValid, isValidating]
  );
};

const getElementType = (e: ChangeEvent<SupportedElements>) => {
  const target = e.currentTarget || e.target;
  const tagName = target.tagName.toLowerCase();

  if (tagName === 'select') {
    return 'select';
  }

  const type = target.getAttribute('type');

  if (tagName === 'input' && type === 'checkbox') {
    return 'checkbox';
  }

  if (tagName === 'input' && type === 'radio') {
    return 'radio';
  }

  if (tagName === 'input') {
    return 'input';
  }

  throw Error('Unsupported input element');
};
