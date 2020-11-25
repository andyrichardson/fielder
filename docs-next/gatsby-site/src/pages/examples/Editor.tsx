import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { scale } from "../../components/components"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

export const Editor = ({ code, scope }: { code: string; scope: any }) => (
  <>
    <LiveProvider theme={theme} code={code} scope={scope} noInline={true}>
      <Preview />
      <LiveError />
      <EditorArea />
    </LiveProvider>
  </>
)

const theme = {
  plain: {
    fontFamily: '"Source Code Pro", monospace',
    color: "#90a4ae",
  },
  styles: [
    {
      types: ["keyword"],
      style: {
        color: "#bd93f9",
      },
    },
    {
      types: [
        "atrule",
        "boolean",
        "constant",
        "function",
        "id",
        "important",
        "keyword",
        "symbol",
      ],
      style: {
        color: "#7c4dff",
      },
    },
    {
      types: [
        "operator",
        "property",
        "punctuation",
        "attr-name",
        "builtin",
        "cdata",
        "char",
        "class",
        "inserted",
      ],
      style: {
        color: "#39adb5",
      },
    },
    {
      types: ["tag", "url", "variable", "deleted", "entity", "selector"],
      style: {
        color: "#e53935",
      },
    },
    {
      types: [
        "attr-value",
        "attribute",
        "psuedo-element",
        "psuedo-class",
        "string",
      ],
      style: {
        color: "#f6a434",
      },
    },
  ],
}

const EditorArea = styled(LiveEditor)`
  font-family: Roboto Mono, monospace;
  font-size: ${scale(0)};
  background: #fafafa;
`

const Preview = styled(LivePreview)`
  display: flex;
  justify-content: center;
  padding: ${scale(1)} 0;

  form {
    padding: ${scale(1)};
    border: solid 2px;
  }

  .field {
    margin: ${scale(1)} 0;
  }

  .field:first-child {
    margin-top: 0;
  }

  .field label {
    font-weight: bold;
    display: inline-block;
    width: ${scale(7)};
  }

  .field input {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: ${scale(0)};
    border: solid 2px;
    padding: ${scale(-6)} ${scale(-4)};

    &:focus {
      outline: none;
    }
  }

  button.primary {
    margin: 0 auto;
    font-size: ${scale(0)};
    font-weight: bold;
    padding: ${scale(-4)};
    background: transparent;
    border: solid 2px;
    float: right;

    &:focus {
      outline: none;
    }
  }
`
