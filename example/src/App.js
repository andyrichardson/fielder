import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FormProvider, useField } from "../../dist";

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
  const [firstNameProps, firstNameMeta] = useField({
    name: "firstName",
    validate: a => (a === undefined ? "This is required!" : undefined)
  });
  const [lastNameProps, lastNameMeta] = useField({
    name: "lastName",
    validate: a => (a === undefined ? "This is required!" : undefined)
  });

  console.log(firstNameProps);

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

export default App;
