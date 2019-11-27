import React, { FC } from "react";
import { render } from "react-dom";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "./components/Code";
import Example from "./Examples/Examples.mdx";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./index.css";

const components = {
  code: Code,
  Test: Code,
  blockquote: (props: any) => (
    <blockquote
      {...props}
      style={{
        background: "#fafafa",
        padding: "9px 10px",
        borderLeft: "solid 4px #949494"
      }}
    />
  )
};

const App: FC = () => (
  <MDXProvider components={components}>
    <Layout
      style={{
        background: "#fff"
      }}
    >
      <Layout.Sider theme="light">
        <Menu style={{ height: "100%" }} mode="inline">
          <Menu.Item>About</Menu.Item>
          <Menu.ItemGroup key="1" title="Examples">
            <Menu.Item key="1">Validation</Menu.Item>
            <Menu.Item key="2">Multi Step</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ margin: "0 auto", padding: 20, maxWidth: 1440 }}>
        <Example />
      </Layout.Content>
    </Layout>
  </MDXProvider>
);

render(<App />, document.getElementById("app"));
