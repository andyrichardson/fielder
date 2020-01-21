import {
  useContext,
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useMemo,
  useLayoutEffect,
  useRef
} from 'react';
import { FielderContext } from './context';
import { FormState, FieldState, FieldConfig } from './types';

export type UseFieldProps<T = any> = {
  readonly name: string;
  readonly value: T;
  readonly onChange: ChangeEventHandler;
  readonly onBlur: () => void;
  readonly ref: (e: HTMLInputElement | HTMLTextAreaElement) => void;
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
  const elementRefs = useRef<HTMLInputElement[]>([]);
  const destroyRef = useRef(destroyOnUnmount);
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
      fields[name] || {
        name,
        error: initialError,
        valid: initialValid,
        value: initialValue,
        touched: initialTouched
      },
    [fields, name]
  );

  useMemo(
    () => syncCheckboxes({ elements: elementRefs.current, value: field.value }),
    [field.value]
  );

  useMemo(() => (destroyRef.current = destroyOnUnmount), [destroyOnUnmount]);

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

    return () => unmountField({ name, destroy: destroyRef.current });
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

  const handleRef = useCallback(element => {
    if (!element) {
      return;
    }

    elementRefs.current = [...elementRefs.current, element];
    syncCheckboxes({ elements: elementRefs.current, value: initialValue });
  }, []);

  return useMemo(
    () => [
      { name, value, onBlur, onChange, ref: handleRef },
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

  if (tagName === 'textarea') {
    return 'textarea';
  }

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

const syncCheckboxes = ({
  elements,
  value
}: {
  elements: HTMLInputElement[];
  value: any;
}) =>
  elements.forEach(element => {
    if (element.type === 'checkbox') {
      element.checked = Array.isArray(value)
        ? value.includes(element.value)
        : false;
    }

    if (element.type === 'radio') {
      element.checked = element.value === value;
    }
  });
