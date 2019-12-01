import React, { FC } from "react"
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../gatsby-config"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Code } from "./Code"
import "antd/dist/antd.css"
import "./Layout.css"
import "./prism-theme.css"
import { Layout, Menu } from "antd"

interface ShellProps {
  pageContext: any
}

const Shell: FC<ShellProps> = ({ children, pageContext }) => {
  console.log(pageContext.frontmatter.title)
  return (
    <>
      <Helmet>
        <title>{pageContext.frontmatter.title}</title>
      </Helmet>
      <Layout
        style={{
          background: "#fff",
        }}
      >
        <Layout.Sider theme="light">
          <Menu style={{ height: "100%" }} mode="inline">
            {siteMetadata.menuLinks.map(m =>
              m.links ? (
                <Menu.ItemGroup key={m.link} title={m.name}>
                  {m.links.map(l => (
                    <Menu.Item key={l.link}>
                      <Link to={`${m.link}/${l.link}`}>{l.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ) : (
                <Menu.Item key={m.link}>
                  <Link to={m.link}>{m.name}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </Layout.Sider>
        <Layout.Content
          style={{ margin: "0 auto", padding: 20, maxWidth: 1440 }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </>
  )
}

export default Shell

// const components = {
//   code: Code,
// }
