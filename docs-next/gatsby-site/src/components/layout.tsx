import "typeface-inter"
import "typeface-source-code-pro"
import "prism-themes/themes/prism-material-light.css"

import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { FC } from "react"
import * as components from "./components"
import styled, { createGlobalStyle } from "styled-components"
import { Navigation } from "./navigation"
import { Header } from "./header"

const Layout: FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <PageContent>
        <Navigation />
        <MDXProvider components={components}>
          <Content>{children}</Content>
        </MDXProvider>
      </PageContent>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Inter", sans-serif;
  }

  pre > code, code {
    font-family: "Source Code Pro", monospace;
  }
`

const PageContent = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 800px;
  padding-left: -200px;
`

const Content = styled.main`
  padding: 10px 10px;
  flex-grow: 1;

  @media (min-width: 600px) {
    padding: 20px 40px;
  }
  /* max-width: 800px; */
`

export default Layout
