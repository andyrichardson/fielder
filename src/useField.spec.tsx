import React from "react";
import { mount } from "enzyme";
import { useField } from "./useField";
import { FormContext } from "./context";

const context = {
  fields: {},
  mountField: jest.fn(),
  unmountField: jest.fn()
};
let response: any;
let args: Parameters<typeof useField>[0];

const Fixture = () => {
  const F = () => {
    response = useField(args);

    return null;
  };

  return (
    <FormContext.Provider value={context as any}>
      <F />
    </FormContext.Provider>
  );
};

beforeEach(jest.clearAllMocks);

describe("on mount", () => {
  it("calls mountField", () => {
    args = { name: "someField" };
    mount(<Fixture />);

    expect(context.mountField).toBeCalledTimes(1);
    expect(context.mountField).toBeCalledWith({
      name: args.name,
      initialError: undefined,
      initialValid: false,
      initialValue: undefined,
      initialTouched: false,
      validate: undefined,
      validateOnBlur: true,
      validateOnChange: true,
      validateOnUpdate: false
    });
  });

  it("calls mountField with default overrides", () => {
    args = {
      name: "someField",
      initialError: "aaa",
      initialValid: true,
      initialValue: "hello",
      initialTouched: true,
      validate: jest.fn(),
      validateOnBlur: false,
      validateOnChange: false,
      validateOnUpdate: true
    };
    mount(<Fixture />);

    expect(context.mountField).toBeCalledTimes(1);
    expect(context.mountField).toBeCalledWith({
      ...args
    });
  });
});

describe("on unmount", () => {
  it("calls unmountField", () => {
    args = { name: "someField" };
    const wrapper = mount(<Fixture />);
    wrapper.unmount();

    expect(context.unmountField).toBeCalledTimes(1);
    expect(context.unmountField).toBeCalledWith({
      name: args.name,
      destroy: false
    });
  });

  it("calls unmountField and destroys value", () => {
    args = { name: "someField", destroyOnUnmount: true };
    const wrapper = mount(<Fixture />);
    wrapper.unmount();

    expect(context.unmountField).toBeCalledTimes(1);
    expect(context.unmountField).toBeCalledWith({
      name: args.name,
      destroy: true
    });
  });
});
