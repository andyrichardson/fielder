/* eslint-disable */
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FormProvider, useField, FormContext } from "./dist";
import { FormState } from "../../src";

function App() {
  return (
    <div className="App">
      <FormProvider>
        <NameField />
      </FormProvider>
    </div>
  );
}

const NameField = () => {
  const ctx = useContext<FormState>(FormContext as any);

  console.log(ctx);
  // @ts-ignore
  const [firstNameProps, firstNameMeta] = useField({
    name: "firstName",
    validate: a => (!a ? "This is required!" : undefined),
    initialValue: "hello"
  });

  // @ts-ignore
  const [lastNameProps, lastNameMeta] = useField({
    name: "lastName",
    validate: l => {
      const val = ctx.fields.firstName.value;
      if (val && val.length > 5) {
        return "Last name is required when first name is more than 5";
      }
    },
    initialTouched: true
  });

  console.log(firstNameProps, firstNameMeta);
  console.log(lastNameProps, lastNameMeta);

  return (
    <>
      <label htmlFor={firstNameProps.name}>First Name</label>
      <input {...firstNameProps} />
      {firstNameMeta.error && <span>{firstNameMeta.error}</span>}
      <label htmlFor={lastNameProps.name}>Last Name</label>
      <input {...lastNameProps} />
      {lastNameMeta.error && <span>{lastNameMeta.error}</span>}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
