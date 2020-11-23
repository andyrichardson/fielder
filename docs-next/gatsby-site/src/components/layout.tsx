import "typeface-inter"
import "typeface-source-code-pro"
import "prism-themes/themes/prism-material-light.css"

import React, { useState, useCallback } from "react"
import { MDXProvider } from "@mdx-js/react"
import * as components from "./components"
import styled, { createGlobalStyle } from "styled-components"
import { Navigation } from "./navigation"
import { Header } from "./header"
import NavButtonIcon from "../images/nav-button.svg"

const Layout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleNavToggle = useCallback(() => setCollapsed(c => !c), [])

  const handleContentClick = useCallback(() => setCollapsed(false), [])

  return (
    <>
      <GlobalStyle />
      <PageContent>
        <Navigation onClick={handleContentClick} data-collapsed={collapsed} />
        <MDXProvider components={components}>
          <Content onClick={handleContentClick}>{children}</Content>
        </MDXProvider>
      </PageContent>
      <NavButton onClick={handleNavToggle} />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Inter", sans-serif;
  }

  pre > code, code {
    font-family: "Source Code Pro", monospace;
  }
`

const PageContent = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  padding-left: -200px;
`

const Content = styled.main`
  box-sizing: border-box;
  width: 100vw;
  padding: 10px 10px;
  flex-grow: 1;

  @media (min-width: 601px) {
    padding: 20px 40px;
    max-width: 800px;
    width: calc(100% - 200px);
  }
`

const NavButton = styled(NavButtonIcon)`
  font-size: ${components.scale(4)};
  position: fixed;
  bottom: 30px;
  right: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  background: #000;
  cursor: pointer;
  z-index: 5;

  @media (min-width: 600px) {
    display: none;
  }
`

export default Layout
