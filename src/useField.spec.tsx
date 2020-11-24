import React, { FC } from 'react';
import { create } from 'react-test-renderer';
import { useField, UseFieldResponse } from './useField';
import { FielderContext } from './context';
import { FieldConfig } from './types';

let context = {
  fields: {},
  mountField: jest.fn(),
  unmountField: jest.fn(),
  blurField: jest.fn(),
  setFieldValue: jest.fn(),
  setFieldState: jest.fn(),
  setFieldValidation: jest.fn(),
};
let response: UseFieldResponse;
let args: FieldConfig<any>;

const F: FC = ({ children }) => {
  response = useField(args);

  return <>{children}</>;
};

const Fixture: FC = ({ children }) => {
  return (
    <FielderContext.Provider value={context as any}>
      <F>{children}</F>
    </FielderContext.Provider>
  );
};

beforeEach(jest.clearAllMocks);

beforeEach(() => {
  context = {
    fields: {},
    mountField: jest.fn(() => ({
      value: 'abc',
      isValid: true,
      isValidating: false,
      hasChanged: false,
      hasBlurred: false,
    })),
    unmountField: jest.fn(),
    blurField: jest.fn(),
    setFieldValue: jest.fn(),
    setFieldState: jest.fn(),
    setFieldValidation: jest.fn(),
  };
});

describe('on mount', () => {
  beforeEach(() =>
    context.mountField.mockReturnValue({
      value: 'abc',
      isValid: true,
      isValidating: false,
      hasChanged: false,
      hasBlurred: false,
    })
  );

  it('calls mount field', () => {
    args = { name: 'someField', initialValue: 'abc', validate: jest.fn() };
    create(<Fixture />);

    expect(context.mountField).toBeCalledTimes(1);
    expect(context.setFieldValidation).toBeCalledTimes(0);
  });

  it('returns state from "mountField" response', () => {
    args = { name: 'someField', initialValue: 'abc', validate: jest.fn() };
    create(<Fixture />);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "name": "someField",
          "onBlur": [Function],
          "onChange": [Function],
          "value": "abc",
        },
        Object {
          "error": undefined,
          "hasBlurred": false,
          "hasChanged": false,
          "isValid": true,
          "isValidating": false,
        },
      ]
    `);
  });
});

describe('on validation changed', () => {
  beforeEach(() =>
    context.mountField.mockReturnValue({
      value: 'abc',
      isValid: true,
      isValidating: false,
      hasChanged: false,
      hasBlurred: false,
    })
  );

  it('calls setFieldValidation', () => {
    const fn1 = () => {};
    const fn2 = () => {};

    args = { name: 'someField', initialValue: 'abc', validate: fn1 };
    const wrapper = create(<Fixture />);

    args = { ...args, validate: fn2 };
    wrapper.update(<Fixture />);

    expect(context.mountField).toBeCalledTimes(1);
    expect(context.setFieldValidation).toBeCalledTimes(1);
  });
});

describe('on unmount', () => {
  it('calls unmountField', () => {
    args = { name: 'someField' };
    const wrapper = create(<Fixture />);
    wrapper.unmount();

    expect(context.unmountField).toBeCalledTimes(1);
    expect(context.unmountField).toBeCalledWith({
      name: args.name,
      destroy: false,
    });
  });

  it('calls unmountField and destroys value', () => {
    args = { name: 'someField', destroyOnUnmount: true };
    const wrapper = create(<Fixture />);
    wrapper.unmount();

    expect(context.unmountField).toBeCalledTimes(1);
    expect(context.unmountField).toBeCalledWith({
      name: args.name,
      destroy: true,
    });
  });

  it('calls unmountField and passes destroy value after change', () => {
    args = { name: 'someField', destroyOnUnmount: false };
    const wrapper = create(<Fixture />);
    args = { ...args, destroyOnUnmount: true };
    wrapper.update(<Fixture />);
    wrapper.unmount();

    expect(context.unmountField).toBeCalledTimes(1);
    expect(context.unmountField).toBeCalledWith({
      name: args.name,
      destroy: true,
    });
  });
});

describe('on blur', () => {
  beforeEach(() => {
    args = { name: 'someField' };
    const wrapper = create(<Fixture />);
    response[0].onBlur();
  });

  it('calls blurField', () => {
    expect(context.blurField).toBeCalledTimes(1);
    expect(context.blurField).toBeCalledWith({
      name: args.name,
    });
  });
});

describe('on change', () => {
  describe('on event arg', () => {
    it('calls setFieldValue with field name', () => {
      const value = 'newval';
      const target = document.createElement('input');
      target.type = 'text';
      target.value = value;

      create(<Fixture />);
      response[0].onChange({
        currentTarget: target,
      } as any);

      expect(context.setFieldValue).toBeCalledTimes(1);
      expect(context.setFieldValue).toBeCalledWith(
        expect.objectContaining({
          name: args.name,
        })
      );
    });
  });

  describe('on value arg', () => {
    it('calls setFieldValue with field name', () => {
      const value = 'newval';

      create(<Fixture />);
      response[0].onChange(value);

      expect(context.setFieldValue).toBeCalledTimes(1);
      expect(context.setFieldValue).toBeCalledWith(
        expect.objectContaining({
          name: args.name,
        })
      );
    });
  });

  describe('on value action dispatch', () => {
    describe('on no existing value', () => {
      it('returns change value', () => {
        const value = 'newval';

        create(<Fixture />);
        response[0].onChange(value);

        const action = context.setFieldValue.mock.calls[0][0].value;
        expect(action()).toEqual(value);
      });
    });

    describe('on existing value is string', () => {
      it('returns change value', () => {
        const oldValue = 'oldval';
        const value = 'newval';

        create(<Fixture />);
        response[0].onChange(value);

        const action = context.setFieldValue.mock.calls[0][0].value;
        expect(action(oldValue)).toEqual(value);
      });
    });

    describe('on existing value is array (without new value)', () => {
      it('appends change value to array', () => {
        const oldValue = ['oldval'];
        const value = 'newval';

        create(<Fixture />);
        response[0].onChange(value);

        const action = context.setFieldValue.mock.calls[0][0].value;
        expect(action(oldValue)).toEqual([...oldValue, value]);
      });
    });

    describe('on existing value is array (with change value)', () => {
      it('removes change value from array', () => {
        const oldValue = ['newval', 'oldval'];
        const value = 'newval';

        create(<Fixture />);
        response[0].onChange(value);

        const action = context.setFieldValue.mock.calls[0][0].value;
        expect(action(oldValue)).toEqual(oldValue.filter((v) => v !== value));
      });
    });
  });
});
