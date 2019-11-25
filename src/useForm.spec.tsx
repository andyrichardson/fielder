import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import React from "react";
import { useForm } from "./useForm";
import { FormState } from "./types";

let response: FormState;

const Fixture = () => {
  response = useForm();

  return null;
};

beforeEach(jest.clearAllMocks);

describe("initial call", () => {
  it("matches snapshot", () => {
    mount(<Fixture />);
    expect(response).toMatchInlineSnapshot(`
      Object {
        "blurField": [Function],
        "fields": Object {},
        "isValid": true,
        "isValidating": false,
        "mountField": [Function],
        "setFieldValue": [Function],
        "unmountField": [Function],
        "validateField": [Function],
        "validateFields": [Function],
      }
    `);
  });
});

describe("on mount field", () => {
  beforeEach(() => {
    mount(<Fixture />);
  });

  describe("on default args", () => {
    beforeEach(() => {
      act(() => response.mountField({ name: "test" }));
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(response.fields).toMatchInlineSnapshot(`
          Object {
            "test": Object {
              "_isActive": true,
              "_validate": undefined,
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": undefined,
              "isValid": false,
              "isValidating": false,
              "name": "test",
              "touched": false,
              "value": undefined,
            },
          }
        `);
      });
    });
  });

  describe("on provided args", () => {
    beforeEach(() => {
      act(() =>
        response.mountField({
          name: "test",
          initialError: "some error",
          initialTouched: true,
          initialValue: "hello",
          destroyOnUnmount: false,
          initialValid: true,
          validate: jest.fn(),
          validateOnBlur: false,
          validateOnChange: false,
          validateOnUpdate: true
        })
      );
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(response.fields).toMatchInlineSnapshot(`
          Object {
            "test": Object {
              "_isActive": true,
              "_validate": [MockFunction],
              "_validateOnBlur": false,
              "_validateOnChange": false,
              "_validateOnUpdate": true,
              "error": "some error",
              "isValid": true,
              "isValidating": false,
              "name": "test",
              "touched": true,
              "value": "hello",
            },
          }
        `);
      });
    });
  });
});

describe("on unmount field", () => {
  const fieldName = "TargetField";
  const value = 5678;

  beforeEach(() => {
    mount(<Fixture />);
  });

  describe("form state", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({
          name: "test",
          initialValue: 1234,
          initialValid: true
        });
        response.mountField({
          name: fieldName,
          initialValue: value,
          initialValid: false
        });
        response.unmountField({ name: fieldName });
      });
    });

    it("is valid", () => {
      expect(response).toHaveProperty("isValid", true);
    });
  });

  describe("fields state", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({
          name: "test",
          initialValue: 1234,
          initialValid: true
        });
        response.mountField({
          name: fieldName,
          initialValue: value,
          initialValid: false
        });
        response.unmountField({ name: fieldName });
      });
    });

    it("matches snapshot", () => {
      expect(response.fields).toMatchInlineSnapshot(`
        Object {
          "TargetField": Object {
            "_isActive": false,
            "_validate": undefined,
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": false,
            "isValidating": false,
            "name": "TargetField",
            "touched": false,
            "value": 5678,
          },
          "test": Object {
            "_isActive": true,
            "_validate": undefined,
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": true,
            "isValidating": false,
            "name": "test",
            "touched": false,
            "value": 1234,
          },
        }
      `);
    });

    it("is not active", () => {
      expect(response.fields[fieldName]).toHaveProperty("_isActive", false);
    });

    it("still has value", () => {
      expect(response.fields[fieldName]).toHaveProperty("value", value);
    });
  });

  describe("on destroy", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({
          name: "test",
          initialValue: 1234,
          initialValid: true
        });
        response.mountField({
          name: fieldName,
          initialValue: value,
          initialValid: false
        });
        response.unmountField({ name: fieldName, destroy: true });
      });
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(response.fields).toMatchInlineSnapshot(`
          Object {
            "test": Object {
              "_isActive": true,
              "_validate": undefined,
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": undefined,
              "isValid": true,
              "isValidating": false,
              "name": "test",
              "touched": false,
              "value": 1234,
            },
          }
        `);
      });

      it("does not contain previous field", () => {
        expect(response.fields[fieldName]).toBe(undefined);
      });
    });
  });

  describe("on provided args", () => {
    beforeEach(() => {
      act(() =>
        response.mountField({
          name: "test",
          initialError: "some error",
          initialTouched: true,
          initialValue: "hello",
          destroyOnUnmount: false,
          initialValid: true,
          validate: jest.fn(),
          validateOnBlur: false,
          validateOnChange: false,
          validateOnUpdate: true
        })
      );
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(response.fields).toMatchInlineSnapshot(`
          Object {
            "test": Object {
              "_isActive": true,
              "_validate": [MockFunction],
              "_validateOnBlur": false,
              "_validateOnChange": false,
              "_validateOnUpdate": true,
              "error": "some error",
              "isValid": true,
              "isValidating": false,
              "name": "test",
              "touched": true,
              "value": "hello",
            },
          }
        `);
      });
    });
  });
});

describe("on blur field", () => {
  const fieldName = "TargetField";
  const validate = jest.fn();

  beforeEach(() => {
    mount(<Fixture />);
  });

  describe("field state", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({ name: fieldName, validate });
        response.blurField({ name: fieldName });
      });
    });

    it("matches snapshot", () => {
      expect(response.fields).toMatchInlineSnapshot(`
        Object {
          "IgnoredField": Object {
            "_isActive": true,
            "_validate": undefined,
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": false,
            "isValidating": false,
            "name": "IgnoredField",
            "touched": false,
            "value": undefined,
          },
          "TargetField": Object {
            "_isActive": true,
            "_validate": [MockFunction],
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": false,
            "isValidating": false,
            "name": "TargetField",
            "touched": true,
            "value": undefined,
          },
        }
      `);
    });

    it("is touched", () => {
      expect(response.fields[fieldName]).toHaveProperty("touched", true);
    });
  });

  describe("with [validateOnBlur = true]", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({
          name: fieldName,
          validate,
          validateOnBlur: true,
          initialValid: true
        });
        response.blurField({ name: fieldName });
      });
    });
    describe("validate function", () => {
      it("is called", () => {
        expect(validate).toBeCalledTimes(1);
        expect(validate).toBeCalledWith(undefined, response.fields);
      });
    });
  });

  describe("with [validateOnBlur = false]", () => {
    describe("validate function", () => {
      beforeEach(() => {
        act(() => {
          response.mountField({ name: "IgnoredField" });
          response.mountField({
            name: fieldName,
            validate,
            validateOnBlur: false
          });
          response.blurField({ name: fieldName });
        });
      });

      it("is not called", () => {
        expect(validate).toBeCalledTimes(0);
      });
    });
  });
});

describe("on change field", () => {
  const fieldName = "TargetField";
  const value = "Hello";
  const validate = jest.fn();

  beforeEach(() => {
    mount(<Fixture />);
  });

  describe("field state", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({ name: fieldName });
        response.setFieldValue({ name: fieldName, value });
      });
    });

    it("matches snapshot", () => {
      expect(response.fields).toMatchInlineSnapshot(`
        Object {
          "IgnoredField": Object {
            "_isActive": true,
            "_validate": undefined,
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": false,
            "isValidating": false,
            "name": "IgnoredField",
            "touched": false,
            "value": undefined,
          },
          "TargetField": Object {
            "_isActive": true,
            "_validate": undefined,
            "_validateOnBlur": false,
            "_validateOnChange": true,
            "_validateOnUpdate": false,
            "error": undefined,
            "isValid": false,
            "isValidating": false,
            "name": "TargetField",
            "touched": false,
            "value": "Hello",
          },
        }
      `);
    });

    it("has new value", () => {
      expect(response.fields[fieldName]).toHaveProperty("value", value);
    });
  });

  describe("with [validateOnChange = true]", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({
          name: fieldName,
          validate,
          validateOnChange: true,
          initialValid: true
        });
        response.setFieldValue({ name: fieldName, value });
      });
    });
    describe("validate function", () => {
      it("is called", () => {
        expect(validate).toBeCalledTimes(1);
        expect(validate).toBeCalledWith(value, response.fields);
      });
    });
  });

  describe("with [validateOnChange = false]", () => {
    describe("validate function", () => {
      beforeEach(() => {
        act(() => {
          response.mountField({ name: "IgnoredField" });
          response.mountField({
            name: fieldName,
            validate,
            validateOnChange: false
          });
          response.blurField({ name: fieldName });
        });
      });

      it("is not called", () => {
        expect(validate).toBeCalledTimes(0);
      });
    });
  });
});

describe("on validate field", () => {
  const fieldName = "TargetField";
  const validate = jest.fn();
  const value = "Field Value";

  beforeEach(() => {
    mount(<Fixture />);
  });

  describe("validation function", () => {
    beforeEach(() => {
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({
          name: fieldName,
          validate,
          initialValid: true,
          initialValue: value
        });
        response.validateField({ name: fieldName });
      });
    });

    it("is called", () => {
      expect(validate).toBeCalledTimes(1);
      expect(validate).toBeCalledWith(value, {
        ...response.fields,
        [fieldName]: {
          ...response.fields[fieldName],
          isValid: true,
          error: undefined
        }
      });
    });
  });

  describe("on failed validation", () => {
    const error = "Name must be longer";

    beforeEach(() => {
      validate.mockReturnValue(error);
      act(() => {
        response.mountField({ name: "IgnoredField" });
        response.mountField({
          name: fieldName,
          validate,
          initialValid: true,
          initialValue: value
        });
        response.validateField({ name: fieldName });
      });
    });

    describe("form state", () => {
      it("is not valid", () => {
        expect(response).toHaveProperty("isValid", false);
      });
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(
          Object.keys(response.fields).reduce(
            // Trim mock from snapshot
            (p, key) => ({
              ...p,
              [key]: { ...p[key], _validate: "stub" as any }
            }),
            response.fields
          )
        ).toMatchInlineSnapshot(`
          Object {
            "IgnoredField": Object {
              "_isActive": true,
              "_validate": "stub",
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": undefined,
              "isValid": false,
              "isValidating": false,
              "name": "IgnoredField",
              "touched": false,
              "value": undefined,
            },
            "TargetField": Object {
              "_isActive": true,
              "_validate": "stub",
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": "Name must be longer",
              "isValid": false,
              "isValidating": false,
              "name": "TargetField",
              "touched": false,
              "value": "Field Value",
            },
          }
        `);
      });

      it("is not valid", () => {
        expect(response.fields[fieldName]).toHaveProperty("isValid", false);
      });

      it("has error value", () => {
        expect(response.fields[fieldName]).toHaveProperty("error", error);
      });
    });
  });

  describe("on successful validation", () => {
    beforeEach(() => {
      validate.mockReturnValue(undefined);
      act(() => {
        response.mountField({ name: "IgnoredField", initialValid: true });
        response.mountField({
          name: fieldName,
          validate,
          initialValid: true,
          initialValue: value
        });
        response.validateField({ name: fieldName });
      });
    });

    describe("form state", () => {
      it("is valid", () => {
        expect(response).toHaveProperty("isValid", true);
      });
    });

    describe("field state", () => {
      it("matches snapshot", () => {
        expect(
          Object.keys(response.fields).reduce(
            // Trim mock from snapshot
            (p, key) => ({
              ...p,
              [key]: { ...p[key], _validate: "stub" as any }
            }),
            response.fields
          )
        ).toMatchInlineSnapshot(`
          Object {
            "IgnoredField": Object {
              "_isActive": true,
              "_validate": "stub",
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": undefined,
              "isValid": true,
              "isValidating": false,
              "name": "IgnoredField",
              "touched": false,
              "value": undefined,
            },
            "TargetField": Object {
              "_isActive": true,
              "_validate": "stub",
              "_validateOnBlur": false,
              "_validateOnChange": true,
              "_validateOnUpdate": false,
              "error": undefined,
              "isValid": true,
              "isValidating": false,
              "name": "TargetField",
              "touched": false,
              "value": "Field Value",
            },
          }
        `);
      });

      it("is valid", () => {
        expect(response.fields[fieldName]).toHaveProperty("isValid", true);
      });

      it("has no error value", () => {
        expect(response.fields[fieldName]).toHaveProperty("error", undefined);
      });
    });
  });
});

describe("on validate fields", () => {
  const validate1 = jest.fn();
  const validate2 = jest.fn();

  beforeEach(() => {
    mount(<Fixture />);
    act(() => {
      response.mountField({ name: "IgnoredField" });
      response.mountField({ name: "field1", validate: validate1 });
      response.mountField({ name: "field2", validate: validate2 });
      response.validateFields();
    });
  });

  describe("all validation functions", () => {
    it("are called", () => {
      expect(validate1).toBeCalledTimes(1);
      expect(validate2).toBeCalledTimes(1);
    });
  });
});
