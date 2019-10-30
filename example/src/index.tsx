/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FormProvider, useField } from "./dist";

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
  // @ts-ignore
  const [firstNameProps, firstNameMeta] = useField({
    name: "firstName",
    validate: a => (!a ? "This is required!" : undefined)
  });

  // @ts-ignore
  const [lastNameProps, lastNameMeta] = useField({
    name: "lastName",
    validate: a => (!a ? "This is required!" : undefined)
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
