import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { scale } from "./components"

export const Navigation: FC = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          id
          slug
          tableOfContents
        }
      }
    }
  `)

  return (
    <Nav>
      {data.allMdx.nodes.map(({ tableOfContents, slug }) => (
        <>
          <NavLink href={`/${slug}`}>{tableOfContents.items[0].title}</NavLink>
          {tableOfContents.items[0].items.map(i => (
            <NavSubLink href={`/${slug}/${i.url}`} key={i}>
              {i.title}
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
