import React, { FC } from 'react';
import { mount } from 'enzyme';
import { useFieldGroup } from './useFieldGroup';
import { FielderContext } from './context';
import { FieldConfig } from './types';
import { act } from 'react-dom/test-utils';

let context = {
  fields: {},
  mountField: jest.fn(),
  unmountField: jest.fn(),
  blurField: jest.fn(),
  setFieldValue: jest.fn(),
};
let response: ReturnType<typeof useFieldGroup>;
let args: FieldConfig<any> = {} as any;

const F: FC = ({ children }) => {
  response = useFieldGroup(args);

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
    mountField: jest.fn(),
    unmountField: jest.fn(),
    blurField: jest.fn(),
    setFieldValue: jest.fn(),
  };
});

describe.skip('initial call', () => {
  it('matches snapshot', () => {
    mount(<Fixture />);
    expect(response).toMatchSnapshot();
  });
});

describe('on mount', () => {
  describe('on first mount', () => {
    it('calls mount field with default value', () => {
      args = { name: 'someField' };
      mount(<Fixture />);

      expect(context.mountField).toBeCalledTimes(1);
      expect(context.mountField).toBeCalledWith({
        name: args.name,
        initialError: undefined,
        initialValid: true,
        initialValue: [],
        validate: undefined,
        validateOnBlur: true,
        validateOnChange: true,
        validateOnUpdate: false,
      });
    });

    it('calls mount field with default overrides', () => {
      args = { name: 'someField', initialValue: [{ age: 50 }] };
      mount(<Fixture />);

      expect(context.mountField).toBeCalledTimes(1);
      expect(context.mountField).toBeCalledWith({
        name: args.name,
        initialError: undefined,
        initialValid: true,
        initialValue: [{ age: 50 }],
        validate: undefined,
        validateOnBlur: true,
        validateOnChange: true,
        validateOnUpdate: false,
      });
    });

    it('matches snapshot', () => {
      args = { name: 'someField' };
      mount(<Fixture />);

      expect(response).toMatchInlineSnapshot(`
        Object {
          "fields": Object {},
          "mountField": [Function],
        }
      `);
    });
  });

  describe.only('on remount', () => {
    beforeEach(() => {
      args = { name: 'someField' };
      context = {
        ...context,
        fields: {
          [args.name]: {
            value: [
              { height: 200, age: 30 },
              { height: 186, age: 46 },
            ],
          },
        },
      };
    });

    it('matches snapshot', () => {
      mount(<Fixture />);
      expect(response).toMatchInlineSnapshot(`
        Object {
          "fields": Object {
            "0.age": 30,
            "0.height": 200,
            "1.age": 46,
            "1.height": 186,
          },
          "mountField": [Function],
        }
      `);
    });
  });
});

describe.skip('on field mount', () => {
  beforeEach(() => {
    mount(<Fixture />);
  });

  it('returns an indexed names', () => {
    const a = 'fieldA';
    const b = 'fieldB';

    act(() => {
      expect(response.mountField({ name: a })).toEqual(`0.${a}`);
    });
    act(() => {
      expect(response.mountField({ name: b })).toEqual(`0.${b}`);
    });
    act(() => {
      expect(response.mountField({ name: a })).toEqual(`1.${a}`);
    });
    act(() => {
      expect(response.mountField({ name: b })).toEqual(`1.${b}`);
    });
  });
});
