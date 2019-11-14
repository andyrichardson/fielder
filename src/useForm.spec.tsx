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
