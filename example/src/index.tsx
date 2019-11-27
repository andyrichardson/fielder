import React, { FC } from "react";
import { render } from "react-dom";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "./components/Code";
import Example from "./Example.mdx";
import "antd/dist/antd.css";

const components = {
  code: Code,
  Test: Code
};

const App: FC = () => (
  <MDXProvider components={components}>
    <Example />
  </MDXProvider>
);

render(<App />, document.getElementById("app"));
