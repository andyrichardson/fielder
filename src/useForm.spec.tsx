import { create, act } from 'react-test-renderer';
import React from 'react';
import { useForm } from './useForm';
import { FormState } from './types';

let response: FormState;

const Fixture = () => {
  response = useForm();

  return null;
};

beforeEach(jest.clearAllMocks);

describe('initial call', () => {
  it('matches snapshot', () => {
    create(<Fixture />);
    expect(response).toMatchSnapshot();
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

  it('calls validation function', () => {
    act(() => {
      response.mountField({ name, validate, initialValue });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        event: 'mount',
        value: initialValue,
      })
    );
  });

  it('calls validation object "mount" function', () => {
    act(() => {
      response.mountField({
        name,
        validate: { mount: validate },
        initialValue,
      });
    });

    expect(validate).toBeCalledWith(
      expect.objectContaining({
        event: 'mount',
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
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate,
      });
    });
    validate.mockClear();
  });

  it('updates hasBlurred state', () => {
    act(() => {
      response.blurField({
        name: fieldName,
      });
    });

    expect(response.fields[fieldName]).toHaveProperty('hasBlurred', true);
  });

  it('calls validation', () => {
    act(() => {
      response.blurField({
        name: fieldName,
      });
    });

    expect(validate).toBeCalledTimes(1);
    expect(validate).toBeCalledWith(
      expect.objectContaining({
        event: 'blur',
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
      response.mountField({
        name: fieldName,
        initialValue: value,
        validate,
      });
    });
    validate.mockClear();
  });

  it('updates hasChanged state', () => {
    act(() => {
      response.setFieldValue({
        name: fieldName,
        value,
      });
    });

    expect(response.fields[fieldName]).toHaveProperty('hasChanged', true);
  });

  it('calls validation', () => {
    act(() => {
      response.setFieldValue({
        name: fieldName,
        value,
      });
    });

    expect(validate).toBeCalledTimes(1);
    expect(validate).toBeCalledWith(
      expect.objectContaining({
        event: 'change',
        value,
      })
    );
  });
});

// describe('on change field', () => {
//   const fieldName = 'TargetField';
//   const value = 'Hello';
//   const validate = jest.fn();

//   beforeEach(() => {
//     mount(<Fixture />);
//   });

//   describe('field value', () => {
//     beforeEach(() => {
//       act(() => {
//         response.mountField({ name: 'IgnoredField' });
//         response.mountField({ name: fieldName });
//         response.setFieldValue({ name: fieldName, value });
//       });
//     });

//     it('matches snapshot', () => {
//       expect(response.fields).toMatchSnapshot();
//     });

//     it('has new value', () => {
//       expect(response.fields[fieldName]).toHaveProperty('value', value);
//     });

//     it('has changed state', () => {
//       expect(response.fields[fieldName]).toHaveProperty('hasChanged', true);
//     });
//   });

//   describe('with [validateOnChange = true]', () => {
//     beforeEach(() => {
//       act(() => {
//         response.mountField({ name: 'IgnoredField' });
//         response.mountField({
//           name: fieldName,
//           validate,
//           validateOnChange: true,
//           initialValid: true,
//         });
//         response.setFieldValue({ name: fieldName, value });
//       });
//     });
//     describe('validate function', () => {
//       it('is called', () => {
//         expect(validate).toBeCalledTimes(1);
//         expect(validate).toBeCalledWith(value, response.fields);
//       });
//     });
//   });

//   describe('with [validateOnChange = false]', () => {
//     describe('validate function', () => {
//       beforeEach(() => {
//         act(() => {
//           response.mountField({ name: 'IgnoredField' });
//           response.mountField({
//             name: fieldName,
//             validate,
//             validateOnChange: false,
//           });
//           response.blurField({ name: fieldName });
//         });
//       });

//       it('is not called', () => {
//         expect(validate).toBeCalledTimes(0);
//       });
//     });
//   });
// });

// describe('on change field (callback)', () => {
//   const fieldName = 'TargetField';
//   const initialValue = 'old value';
//   const value = 'Hello';
//   const callback = jest.fn(() => value);

//   beforeEach(() => {
//     mount(<Fixture />);
//   });

//   describe('field value', () => {
//     beforeEach(() => {
//       act(() => {
//         response.mountField({ name: 'IgnoredField' });
//         response.mountField({ name: fieldName, initialValue });
//         response.setFieldValue({ name: fieldName, value: callback });
//       });
//     });

//     it('matches snapshot', () => {
//       expect(response.fields).toMatchSnapshot();
//     });

//     it('has new value', () => {
//       expect(response.fields[fieldName]).toHaveProperty('value', value);
//     });

//     it('calls callback with old value', () => {
//       expect(callback).toBeCalledTimes(1);
//       expect(callback).toHaveBeenCalledWith(initialValue);
//     });
//   });
// });

// describe('on validate field', () => {
//   const fieldName = 'TargetField';
//   const validate = jest.fn();
//   const value = 'Field Value';

//   beforeEach(() => {
//     mount(<Fixture />);
//   });

//   describe('validation function', () => {
//     beforeEach(() => {
//       act(() => {
//         response.mountField({ name: 'IgnoredField' });
//         response.mountField({
//           name: fieldName,
//           validate,
//           initialValid: true,
//           initialValue: value,
//         });
//         response.validateField({ name: fieldName });
//       });
//     });

//     it('is called', () => {
//       expect(validate).toBeCalledTimes(1);
//       expect(validate).toBeCalledWith(value, {
//         ...response.fields,
//         [fieldName]: {
//           ...response.fields[fieldName],
//           isValid: true,
//           error: undefined,
//         },
//       });
//     });
//   });

//   describe('on failed validation', () => {
//     const error = 'Name must be longer';

//     beforeEach(() => {
//       validate.mockImplementation(() => {
//         throw error;
//       });
//       act(() => {
//         response.mountField({ name: 'IgnoredField' });
//         response.mountField({
//           name: fieldName,
//           validate,
//           initialValid: true,
//           initialValue: value,
//         });
//         response.validateField({ name: fieldName });
//       });
//     });

//     describe('form state', () => {
//       it('is not valid', () => {
//         expect(response).toHaveProperty('isValid', false);
//       });
//     });

//     describe('field state', () => {
//       it('matches snapshot', () => {
//         expect(
//           Object.keys(response.fields).reduce(
//             // Trim mock from snapshot
//             (p, key) => ({
//               ...p,
//               [key]: { ...p[key], _validate: 'stub' as any },
//             }),
//             response.fields
//           )
//         ).toMatchInlineSnapshot(`
//           Object {
//             "IgnoredField": Object {
//               "_isActive": true,
//               "_validate": "stub",
//               "_validateOnBlur": false,
//               "_validateOnChange": true,
//               "_validateOnUpdate": false,
//               "error": undefined,
//               "hasBlurred": false,
//               "hasChanged": false,
//               "isValid": false,
//               "isValidating": false,
//               "name": "IgnoredField",
//               "touched": false,
//               "value": undefined,
//             },
//             "TargetField": Object {
//               "_isActive": true,
//               "_validate": "stub",
//               "_validateOnBlur": false,
//               "_validateOnChange": true,
//               "_validateOnUpdate": false,
//               "error": "Name must be longer",
//               "hasBlurred": false,
//               "hasChanged": false,
//               "isValid": false,
//               "isValidating": false,
//               "name": "TargetField",
//               "touched": false,
//               "value": "Field Value",
//             },
//           }
//         `);
//       });

//       it('is not valid', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValid', false);
//       });

//       it('has error value', () => {
//         expect(response.fields[fieldName]).toHaveProperty('error', error);
//       });
//     });
//   });

//   describe('on successful validation', () => {
//     beforeEach(() => {
//       validate.mockReturnValue(undefined);
//       act(() => {
//         response.mountField({ name: 'IgnoredField', initialValid: true });
//         response.mountField({
//           name: fieldName,
//           validate,
//           initialValid: true,
//           initialValue: value,
//         });
//         response.validateField({ name: fieldName });
//       });
//     });

//     describe('form state', () => {
//       it('is valid', () => {
//         expect(response).toHaveProperty('isValid', true);
//       });
//     });

//     describe('field state', () => {
//       it('matches snapshot', () => {
//         expect(
//           Object.keys(response.fields).reduce(
//             // Trim mock from snapshot
//             (p, key) => ({
//               ...p,
//               [key]: { ...p[key], _validate: 'stub' as any },
//             }),
//             response.fields
//           )
//         ).toMatchInlineSnapshot(`
//           Object {
//             "IgnoredField": Object {
//               "_isActive": true,
//               "_validate": "stub",
//               "_validateOnBlur": false,
//               "_validateOnChange": true,
//               "_validateOnUpdate": false,
//               "error": undefined,
//               "hasBlurred": false,
//               "hasChanged": false,
//               "isValid": true,
//               "isValidating": false,
//               "name": "IgnoredField",
//               "touched": false,
//               "value": undefined,
//             },
//             "TargetField": Object {
//               "_isActive": true,
//               "_validate": "stub",
//               "_validateOnBlur": false,
//               "_validateOnChange": true,
//               "_validateOnUpdate": false,
//               "error": undefined,
//               "hasBlurred": false,
//               "hasChanged": false,
//               "isValid": true,
//               "isValidating": false,
//               "name": "TargetField",
//               "touched": false,
//               "value": "Field Value",
//             },
//           }
//         `);
//       });

//       it('is valid', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValid', true);
//       });

//       it('has no error value', () => {
//         expect(response.fields[fieldName]).toHaveProperty('error', undefined);
//       });
//     });
//   });
// });

// describe('on validate field (async)', () => {
//   const fieldName = 'TargetField';
//   let resolve: (a?: any) => void;
//   let reject: (a?: any) => void;

//   beforeEach(() => {
//     mount(<Fixture />);
//   });

//   beforeEach(() => {
//     act(() => {
//       response.mountField({ name: 'IgnoredField' });
//       response.mountField({
//         name: fieldName,
//         validate: () =>
//           new Promise((res, rej) => {
//             resolve = res;
//             reject = rej;
//           }),
//       });
//     });
//   });

//   describe('on call', () => {
//     beforeEach(() => {
//       act(() => {
//         response.validateField({ name: fieldName });
//       });
//     });

//     describe('field state', () => {
//       it('is validating', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValidating', true);
//       });
//     });
//   });

//   describe('on resolve', () => {
//     beforeEach(async () => {
//       act(() => {
//         response.validateField({ name: fieldName });
//       });
//       await act(async () => {
//         resolve();
//       });
//     });

//     describe('field state', () => {
//       it('matches snapshot', () => {
//         expect(response.fields[fieldName]).toMatchSnapshot();
//       });

//       it('is not validating', () => {
//         expect(response.fields[fieldName]).toHaveProperty(
//           'isValidating',
//           false
//         );
//       });

//       it('has no error', () => {
//         expect(response.fields[fieldName]).toHaveProperty('error', undefined);
//       });

//       it('is valid', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValid', true);
//       });
//     });
//   });

//   describe('on resolve (with value)', () => {
//     const val = 'Some error';

//     beforeEach(async () => {
//       act(() => {
//         response.validateField({ name: fieldName });
//       });
//       await act(async () => {
//         resolve(val);
//       });
//     });

//     describe('field state', () => {
//       it('matches snapshot', () => {
//         expect(response.fields[fieldName]).toMatchSnapshot();
//       });

//       it('is not validating', () => {
//         expect(response.fields[fieldName]).toHaveProperty(
//           'isValidating',
//           false
//         );
//       });

//       it('has error', () => {
//         expect(response.fields[fieldName]).toHaveProperty('error', val);
//       });

//       it('is not valid', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValid', false);
//       });
//     });
//   });

//   describe('on reject (with value)', () => {
//     const val = 'Some error';

//     beforeEach(async () => {
//       act(() => {
//         response.validateField({ name: fieldName });
//       });
//       await act(async () => {
//         reject(val);
//       });
//     });

//     describe('field state', () => {
//       it('matches snapshot', () => {
//         expect(response.fields[fieldName]).toMatchSnapshot();
//       });

//       it('is not validating', () => {
//         expect(response.fields[fieldName]).toHaveProperty(
//           'isValidating',
//           false
//         );
//       });

//       it('has error', () => {
//         expect(response.fields[fieldName]).toHaveProperty('error', val);
//       });

//       it('is not valid', () => {
//         expect(response.fields[fieldName]).toHaveProperty('isValid', false);
//       });
//     });
//   });

//   describe('on multiple validation calls', () => {
//     const val = 'Some error';

//     beforeEach(() => {
//       act(() => {
//         response.validateField({ name: fieldName });
//       });
//     });

//     describe('on old resolves -> new pending', () => {
//       beforeEach(async () => {
//         const initialResolve = resolve;
//         act(() => {
//           response.validateField({ name: fieldName });
//         });

//         await act(async () => {
//           initialResolve(val);
//         });
//       });

//       describe('field state', () => {
//         it('is validating', () => {
//           expect(response.fields[fieldName]).toHaveProperty(
//             'isValidating',
//             true
//           );
//         });
//       });
//     });

//     describe('on new resolves -> old rejects', () => {
//       beforeEach(async () => {
//         const initialResolve = resolve;
//         act(() => {
//           response.validateField({ name: fieldName });
//         });

//         await act(async () => {
//           resolve();
//           initialResolve(val);
//         });
//       });

//       describe('field state', () => {
//         it('is not validating', () => {
//           expect(response.fields[fieldName]).toHaveProperty(
//             'isValidating',
//             false
//           );
//         });

//         it('has no error', () => {
//           expect(response.fields[fieldName]).toHaveProperty('error', undefined);
//         });

//         it('is valid', () => {
//           expect(response.fields[fieldName]).toHaveProperty('isValid', true);
//         });
//       });
//     });
//   });
// });

// describe('on validate fields', () => {
//   const validate1 = jest.fn();
//   const validate2 = jest.fn();

//   beforeEach(() => {
//     mount(<Fixture />);
//     act(() => {
//       response.mountField({ name: 'IgnoredField' });
//       response.mountField({ name: 'field1', validate: validate1 });
//       response.mountField({ name: 'field2', validate: validate2 });
//       response.validateFields();
//     });
//   });

//   describe('all validation functions', () => {
//     it('are called', () => {
//       expect(validate1).toBeCalledTimes(1);
//       expect(validate2).toBeCalledTimes(1);
//     });
//   });
// });

// describe('on set field state', () => {
//   const validateFn = jest.fn();

//   beforeEach(() => {
//     mount(<Fixture />);
//     act(() => {
//       response.mountField({
//         name: 'myField',
//         validate: validateFn,
//         validateOnChange: true,
//         validateOnBlur: false,
//       });
//       response.mountField({ name: 'otherField' });
//     });
//   });

//   describe('on state object', () => {
//     it('sets state', () => {
//       const newState = {
//         name: 'myField',
//         _validateOnBlur: true,
//         _validateOnChange: false,
//         value: 'new value',
//       } as any;

//       act(() => {
//         response.setFieldState({
//           name: 'myField',
//           state: newState,
//         });
//       });

//       expect(response.fields.myField).toBe(newState);
//     });
//   });

//   describe('on state function', () => {
//     const stateFn = jest.fn((s) => ({
//       ...s,
//       _validateOnBlur: true,
//       value: 'new value',
//     }));

//     beforeEach(() => {
//       act(() => {
//         response.setFieldState({
//           name: 'myField',
//           state: stateFn,
//         });
//       });
//     });

//     it('calls function with state value', () => {
//       expect(stateFn).toBeCalledTimes(1);
//       expect(stateFn).toBeCalledWith(
//         expect.objectContaining({
//           name: 'myField',
//           _validate: validateFn,
//           _validateOnChange: true,
//           _validateOnBlur: false,
//         })
//       );
//     });

//     it('sets state', () => {
//       expect(response.fields.myField).toEqual(
//         expect.objectContaining({ _validateOnBlur: true, value: 'new value' })
//       );
//     });
//   });

//   describe('validation arg', () => {
//     describe('on undefined', () => {
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//           });
//         });
//       });

//       it('does not validate field', () => {
//         expect(validateFn).toBeCalledTimes(0);
//       });
//     });

//     describe('on false', () => {
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//             validate: false,
//           });
//         });
//       });

//       it('does not validate field', () => {
//         expect(validateFn).toBeCalledTimes(0);
//       });
//     });

//     describe('on true', () => {
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//             validate: true,
//           });
//         });
//       });

//       it('validates field', () => {
//         expect(validateFn).toBeCalledTimes(1);
//       });
//     });

//     describe('on validation fn', () => {
//       const fn = jest.fn();
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//             validate: fn,
//           });
//         });
//       });

//       it('call function with state', () => {
//         expect(fn).toBeCalledTimes(1);
//         expect(fn).toBeCalledWith(expect.objectContaining({ name: 'myField' }));
//       });
//     });

//     describe('on validation truthy', () => {
//       const fn = jest.fn(() => true);
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//             validate: fn,
//           });
//         });
//       });

//       it('validates field', () => {
//         expect(validateFn).toBeCalledTimes(1);
//       });
//     });

//     describe('on validation falsy', () => {
//       const fn = jest.fn(() => false);
//       beforeEach(() => {
//         act(() => {
//           response.setFieldState({
//             name: 'myField',
//             state: (s) => ({ ...s, value: 'new value' }),
//             validate: fn,
//           });
//         });
//       });

//       it('does not validate field', () => {
//         expect(validateFn).toBeCalledTimes(0);
//       });
//     });
//   });
// });
