import React, { useState } from "react";
import * as ant from "antd";
import * as Yup from "yup";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useForm, useField, useFormContext, FielderProvider } from "fielder";
import { ErrorMessage } from "./Error";
import { RadioGroup } from "./Radio";

const scope = {
  React,
  ...React,
  ...ant,
  ErrorMessage,
  RadioGroup,
  Yup,
  useForm,
  useField,
  useFormContext,
  FielderProvider,
  LiveEditor
};

const { Card, Icon } = ant;

export const Code = ({ children, className, live }) => {
  const [showCode, setCodeVisibility] = useState(false);
  const language = className.replace(/language-/, "");

  if (live) {
    return (
      <>
        <LiveProvider noInline={true} code={children} scope={scope}>
          <Card
            style={{ marginTop: "40px" }}
            actions={[
              <Icon onClick={() => setCodeVisibility(s => !s)} type="code" />
            ]}
          >
            <LivePreview />
          </Card>
          {showCode && (
            <Card>
              <LiveEditor />
              <LiveError />
            </Card>
          )}
        </LiveProvider>
      </>
    );
  }
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
