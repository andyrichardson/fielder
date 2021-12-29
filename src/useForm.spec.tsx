import { create, act } from 'react-test-renderer';
import React from 'react';
import { useForm } from './useForm';
import { FormState } from './types';

let response: FormState;

const Fixture = (args: any = {}) => {
  response = useForm(args);

  return null;
};

beforeEach(jest.clearAllMocks);

describe('initial call', () => {
  it('matches snapshot', () => {
    create(<Fixture />);
    expect(response).toMatchSnapshot();
  });
});

describe('on fromState', () => {
  it('matches snapshot', () => {
    create(<Fixture fromState={{ field1: 'value1', field2: 'value2' }} />);
    expect(response).toMatchSnapshot();
  });
});

describe('on premount field', () => {
  const name = 'test';
  const initialValue = '1234';
  const validate = jest.fn();

  beforeEach(() => {
    create(<Fixture />);
  });

  it("doesn't mount field", () => {
    act(() => {
      response.premountField({ name });
    });
    expect(response.fields[name]).toBe(undefined);
  });

  it('returns pseudo-mounted field', () => {
    let field;
    act(() => {
      field = response.premountField({ name });
    });

    expect(field).toMatchInlineSnapshot(`
      Object {
        "_isActive": true,
        "_validate": undefined,
        "error": undefined,
        "hasBlurred": false,
        "hasChanged": false,
        "isValid": true,
        "isValidating": false,
        "name": "test",
        "value": undefined,
      }
    `);
  });

  it('calls "mount" event on validation', () => {
    act(() => {
      response.premountField({ name, validate, initialValue });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'mount',
        value: initialValue,
      })
    );
  });
});

describe('on mount field', () => {
  const name = 'test';
  const initialValue = '1234';
  const validate = jest.fn();

  beforeEach(() => {
    create(<Fixture />);
  });

  it('mounts field', () => {
    act(() => {
      response.mountField({ name });
    });
    expect(response.fields[name]).toMatchInlineSnapshot(`
      Object {
        "_isActive": true,
        "_validate": undefined,
        "error": undefined,
        "hasBlurred": false,
        "hasChanged": false,
        "isValid": true,
        "isValidating": false,
        "name": "test",
        "value": undefined,
      }
    `);
  });

  it('returns mounted field', () => {
    let field;
    act(() => {
      field = response.mountField({ name });
    });

    expect(field).toEqual(response.fields[name]);
  });

  it.each([
    ['function', validate],
    ["object's function", { mount: validate }],
  ])('calls validation %s', (_, validation) => {
    act(() => {
      response.mountField({ name, validate: validation, initialValue });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'mount',
        value: initialValue,
      })
    );
  });
});

describe('on unmount field', () => {
  const fieldName = 'TargetField';
  const value = 5678;

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: 'test',
        initialValue: 1234,
      });
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate: () => {
          throw Error('');
        },
      });
      response.blurField({
        name: fieldName,
      });
    });
  });

  it('matches snapshot', () => {
    act(() => {
      response.unmountField({ name: fieldName });
    });
    expect(response.fields[fieldName]).toMatchInlineSnapshot(`
      Object {
        "_isActive": false,
        "_validate": [Function],
        "error": [Error],
        "hasBlurred": true,
        "hasChanged": false,
        "isValid": false,
        "isValidating": false,
        "name": "TargetField",
        "value": 5678,
      }
    `);
  });

  it('ignores field for form validity', () => {
    act(() => {
      response.unmountField({ name: fieldName });
    });
    expect(response.isValid).toBe(true);
  });
});

describe('on unmount field (destroy)', () => {
  const fieldName = 'TargetField';
  const value = 5678;

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: 'test',
        initialValue: 1234,
      });
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate: () => {
          throw Error('');
        },
      });
      response.blurField({
        name: fieldName,
      });
    });
  });

  it('removes field', () => {
    act(() => {
      response.unmountField({ name: fieldName, destroy: true });
    });
    expect(response.fields[fieldName]).toBe(undefined);
  });
});

describe('on remount field', () => {
  const validate = jest.fn();
  const fieldName = 'TargetField';
  const value = 5678;

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: 'test',
        initialValue: 1234,
      });
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate: () => {
          throw Error('');
        },
      });
      response.blurField({
        name: fieldName,
      });
      response.unmountField({
        name: fieldName,
      });
    });
  });

  it('matches snapshot on field', () => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: 'abcd',
      });
    });

    expect(response.fields[fieldName]).toMatchInlineSnapshot(`
      Object {
        "_isActive": true,
        "_validate": undefined,
        "error": [Error],
        "hasBlurred": false,
        "hasChanged": false,
        "isValid": true,
        "isValidating": false,
        "name": "TargetField",
        "value": 5678,
      }
    `);
  });

  it.each([
    ['function', validate],
    ["object's function", { mount: validate }],
  ])('calls validation %s', (_, validation) => {
    act(() => {
      response.mountField({
        name: fieldName,
        validate: validation,
        initialValue: value,
      });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'mount',
        value,
      })
    );
  });
});

describe('on blur field', () => {
  const fieldName = 'TargetField';
  const value = 5678;
  const validate = jest.fn();

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: 'test',
        initialValue: 1234,
      });
    });
    validate.mockClear();
  });

  it('updates hasBlurred state', () => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate,
      });
      response.blurField({
        name: fieldName,
      });
    });

    expect(response.fields[fieldName]).toHaveProperty('hasBlurred', true);
  });

  it.each([
    ['function', validate],
    ["object's function", { blur: validate }],
  ])('calls validation %s', (_, validation) => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate: validation,
      });
      response.blurField({
        name: fieldName,
      });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'blur',
        value: value,
      })
    );
  });
});

describe('on change field', () => {
  const fieldName = 'TargetField';
  const value = 5678;
  const validate = jest.fn();

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: 'test',
        initialValue: 1234,
      });
    });
  });

  it('updates hasChanged state', () => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate,
      });
      response.setFieldValue({
        name: fieldName,
        value,
      });
    });

    expect(response.fields[fieldName]).toHaveProperty('hasChanged', true);
  });

  it.each([
    ['function', validate],
    ["object's function", { change: validate }],
  ])('calls `change` validation %s on updated field', (_, validation) => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate: validation,
      });
      response.setFieldValue({
        name: fieldName,
        value,
      });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'change',
        value: value,
      })
    );
  });

  it.each([
    ['function', validate],
    ["object's function", { update: validate }],
  ])('calls `update` validation %s on other field/s', (_, validation) => {
    act(() => {
      response.mountField({
        name: fieldName,
        initialValue: value,
      });
      response.mountField({
        name: 'otherField',
        initialValue: '',
        validate: validation,
      });
      response.setFieldValue({
        name: fieldName,
        value,
      });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        trigger: 'update',
        form: expect.objectContaining({
          [fieldName]: expect.objectContaining({
            value,
          }),
        }),
      })
    );
  });
});

describe('on validate field', () => {
  const name = 'TargetField';
  const value = 5678;
  const validate = jest.fn();

  beforeEach(() => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name,
        initialValue: value,
        validate,
      });
    });
    validate.mockClear();
  });

  it('calls validation with default trigger (change)', () => {
    act(() => {
      response.validateField({ name });
    });
    expect(validate).toBeCalledTimes(1);
    expect(validate).toBeCalledWith(
      expect.objectContaining({
        value,
        trigger: 'change',
      })
    );
  });

  it('calls validation with default trigger (change)', () => {
    act(() => {
      response.validateField({ name, trigger: 'blur' });
    });
    expect(validate).toBeCalledTimes(1);
    expect(validate).toBeCalledWith(
      expect.objectContaining({
        value,
        trigger: 'blur',
      })
    );
  });
});

describe('on validate submission', () => {
  const validate1 = jest.fn();
  const validate2 = jest.fn();
  const validate3 = jest.fn();

  beforeEach(async () => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name: '1',
        initialValue: '1',
        validate: validate1,
      });
      response.mountField({
        name: '2',
        initialValue: '2',
        validate: { submit: validate2 },
      });
      response.mountField({
        name: '3',
        initialValue: '3',
        validate: validate2,
      });
      response.unmountField({
        name: '3',
      });
    });

    validate1.mockClear();
    validate2.mockClear();
    validate3.mockClear();
  });

  it('calls validation functions', () => {
    act(() => {
      response.validateSubmission();
    });

    expect(validate1).toBeCalledTimes(1);
    expect(validate1).toBeCalledWith(
      expect.objectContaining({
        trigger: 'submit',
        value: '1',
      })
    );
    expect(validate2).toBeCalledTimes(1);
    expect(validate2).toBeCalledWith(
      expect.objectContaining({
        trigger: 'submit',
        value: '2',
      })
    );
    expect(validate3).toBeCalledTimes(0);
  });

  it('returns synchronous errors', () => {
    validate1.mockImplementation(() => {
      throw Error('Something wrong with 1');
    });

    let errs;
    act(() => {
      errs = response.validateSubmission();
    });

    expect(errs).toEqual(
      expect.objectContaining({
        errors: {
          '1': 'Something wrong with 1',
        },
      })
    );
  });

  it('returns async errors', async () => {
    let res;

    validate1.mockReturnValueOnce(Promise.reject(new Error('Async error')));
    validate2.mockReturnValueOnce(Promise.resolve());

    await act(async () => {
      res = await response.validateSubmission();
    });

    expect(res).toEqual(
      expect.objectContaining({
        errors: {
          '1': 'Async error',
        },
      })
    );
  });

  it('returns async+sync errors', async () => {
    let res;

    validate1.mockReturnValueOnce(Promise.reject(new Error('Async error')));
    validate2.mockImplementation(() => {
      throw Error('Sync error');
    });

    await act(async () => {
      res = await response.validateSubmission();
    });

    expect(res).toEqual(
      expect.objectContaining({
        errors: {
          '1': 'Async error',
          '2': 'Sync error',
        },
      })
    );
  });
});

describe('on setFieldValidation', () => {
  const name = '1';
  const initialValue = 'some value';
  const newValue = 'new value!';
  const validation = jest.fn();

  beforeEach(async () => {
    create(<Fixture />);
    act(() => {
      response.mountField({
        name,
        initialValue,
      });
    });
  });

  it('calls validation function with mount event', () => {
    act(() => {
      response.setFieldValidation({ name, validation });
    });

    expect(validation).toBeCalledTimes(1);
    expect(validation).toBeCalledWith(
      expect.objectContaining({
        trigger: 'mount',
        value: initialValue,
      })
    );
  });

  it('calls validation function with change event', () => {
    act(() => {
      response.setFieldValue({
        name,
        value: newValue,
      });
    });
    act(() => {
      response.setFieldValidation({ name, validation });
    });

    expect(validation).toBeCalledTimes(1);
    expect(validation).toBeCalledWith(
      expect.objectContaining({
        trigger: 'change',
        value: newValue,
      })
    );
  });

  it('calls validation function with blur event', () => {
    act(() => {
      response.setFieldValue({
        name,
        value: newValue,
      });
    });
    act(() => {
      response.blurField({
        name,
      });
    });
    act(() => {
      response.setFieldValidation({ name, validation });
    });

    expect(validation).toBeCalledTimes(1);
    expect(validation).toBeCalledWith(
      expect.objectContaining({
        trigger: 'blur',
        value: newValue,
      })
    );
  });
});
