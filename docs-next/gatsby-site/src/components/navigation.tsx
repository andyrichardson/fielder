import React, { FC } from "react"
import styled from "styled-components"
import { scale } from "./components"
import { useMemo } from "react"

export const Navigation: FC = () => {
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
          { title: "Field events", url: "/guides/field-events" },
          { title: "Type safety", url: "/guides/type-safety" },
          { title: "React Native", url: "/guides/react-native" },
        ],
      },
      {
        title: "Api",
        url: "/guides/getting-started",
        children: [
          { title: "useField", url: "/api/useField" },
          { title: "useForm", url: "/api/useForm" },
          { title: "useFormContext", url: "/api/field-events" },
          { title: "FielderProvider", url: "/api/FielderProvider" },
        ],
      },
      { title: "Examples", url: "/examples" },
    ],
    []
  )

  return (
    <Nav>
      {routes.map(r => (
        <>
          <NavLink key={r.url} href={r.url}>
            {r.title}
          </NavLink>
          {r.children &&
            r.children.map(c => (
              <NavSubLink key={c.url} href={c.url}>
                {c.title}
              </NavSubLink>
            ))}
        </>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`
  position: sticky;
  height: min-content;
  top: 60px;
  display: flex;
  flex-direction: column;
  width: 200px;
`

const NavLink = styled.a`
  padding: ${scale(-1)} 0;
  text-decoration: none;
  font-size: ${scale(0.5)};
  color: #000;
  font-weight: bold;
`

const NavSubLink = styled.a`
  text-decoration: none;
  font-size: ${scale(0)};
  color: #000;
  padding: ${scale(-4)} 0;
  padding-left: ${scale(-2)};
`
