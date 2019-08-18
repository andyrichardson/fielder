import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createFormContext, FormProvider, useField } from "./files";

const MyFormContext = createFormContext({
  values: {
    name: "",
    address: {
      city: ""
    }
  }
});

const App = () => {
  return <FormProvider context={MyFormContext} />;
};

const child = () => {
  const x = useField(MyFormContext, { property: ["address", "city"] });
};
ReactDOM.render(<App />, document.getElementById("root"));
