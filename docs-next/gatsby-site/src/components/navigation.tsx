import React, { FC } from "react"
import styled from "styled-components"
import Icon from "../images/icon.svg"
import { scale } from "./components"
import { useMemo } from "react"
import { Link } from "gatsby"

export const Navigation: FC = ({ ...props }) => {
  const routes = useMemo(
    () => [
      { title: "About", url: "/" },
      {
        title: "Guides",
        url: "/guides/getting-started",
        children: [
          { title: "Getting started", url: "/guides/getting-started" },
          { title: "Validation", url: "/guides/validation" },
          { title: "Submission", url: "/guides/submission" },
          { title: "Field events", url: "/guides/field-lifecycle" },
          { title: "Type safety", url: "/guides/type-safety" },
          { title: "React Native", url: "/guides/react-native" },
        ],
      },
      {
        title: "Api",
        url: "/api/useField",
        children: [
          { title: "useField", url: "/api/useField" },
          { title: "useForm", url: "/api/useForm" },
          { title: "useFormContext", url: "/api/useFormContext" },
          { title: "FielderProvider", url: "/api/FielderProvider" },
        ],
      },
      {
        title: "Examples",
        url: "/examples/static-forms",
        children: [
          { title: "Static forms", url: "/examples/static-forms" },
          { title: "Dynamic forms", url: "/examples/dynamic-forms" },
        ],
      },
      { title: "GitHub", url: "https://google.com/examples" },
    ],
    []
  )

  return (
    <Nav {...props}>
      <Logo />
      {routes.map(r => (
        <>
          <NavLink key={r.url} to={r.url}>
            {r.title}
          </NavLink>
          {r.children &&
            r.children.map(c => (
              <NavSubLink key={c.url} to={c.url}>
                {c.title}
              </NavSubLink>
            ))}
        </>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`
  box-sizing: border-box;
  position: sticky;
  height: min-content;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 0 ${scale(2)};

  @media (max-width: 600px) {
    background: #fff;
    z-index: 1;
    height: 100%;
    position: fixed;
    width: 100vw;
    min-width: 100vw;
    margin-left: 0;
    transition: margin-left 200ms ease;
    width: 100vw;
    min-width: 100vw;
    margin-left: 0;
    transition: margin-left 200ms ease;
    overflow: auto;

    &[data-collapsed] {
      margin-left: -100vw;
    }
  }

  @media (min-width: 601px) {
    width: 200px;
  }
`

const Logo = styled(Icon)`
  font-size: ${scale(3)};
  margin-top: 60px;
  margin-bottom: ${scale(2)};
  overflow: visible;
`

const NavLink = styled(Link)`
  padding: ${scale(-1)} 0;
  text-decoration: none;
  font-size: ${scale(0.5)};
  color: #000;
  font-weight: bold;
`

const NavSubLink = styled(props => (
  <Link activeClassName={"active"} {...props} />
))`
  text-decoration: none;
  font-size: ${scale(0)};
  color: #000;
  padding: ${scale(-4)} 0;
  padding-left: ${scale(-2)};

  &.active {
    color: #e36975;
  }
`
