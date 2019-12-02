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
import MenuItem from "antd/lib/menu/MenuItem"

interface ShellProps {
  pageContext: any
}

const Shell: FC<ShellProps> = ({ children, pageContext, uri }) => {
  console.log(uri)
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
          <Menu selectedKeys={[uri]} style={{ height: "100%" }} mode="inline">
            {siteMetadata.menuLinks.map(renderMenuItem)}
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

interface Link {
  name: string
  link: string
  links?: Link[]
}

const renderMenuItem: FC<Link> = ({ name, link, links }) => {
  if (links === undefined) {
    return (
      <Menu.Item key={link}>
        <Link to={link}>{name}</Link>
      </Menu.Item>
    )
  }

  return (
    <Menu.ItemGroup key={link} title={name}>
      {links.map(l => ({ ...l, link: `${link}${l.link}` })).map(renderMenuItem)}
    </Menu.ItemGroup>
  )
}

export default Shell

// const components = {
//   code: Code,
// }
