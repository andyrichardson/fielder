import React, { FC } from "react";
import { render } from "react-dom";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "./components/Code";
import Example from "./Examples/Examples.mdx";
import { Layout } from "antd";
import "antd/dist/antd.css";

const components = {
  code: Code,
  Test: Code
};

const App: FC = () => (
  <MDXProvider components={components}>
    <div style={{ padding: 20 }}>
      <Layout.Content>
        <Example />
      </Layout.Content>
    </div>
  </MDXProvider>
);

render(<App />, document.getElementById("app"));
