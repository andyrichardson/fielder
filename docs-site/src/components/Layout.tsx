import React, { FC, useMemo } from "react"
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../gatsby-config"
import { Link } from "gatsby"
// import "antd/dist/antd.css"
import "./Layout.css"
import "./prism-theme.css"
import { Layout, Menu } from "antd"

interface ShellProps {
  pageContext: any
}

const Shell: FC<ShellProps> = ({ children, pageContext, uri }) => {
  console.log(uri)

  const defaultOpenKeys = useMemo(() => {
    try {
      const key = /^(.+?)\//.exec(uri)[0].slice(0, -1)
      return [key]
    } catch (err) {
      return [] as string[]
    }
  }, [uri])

  console.log(defaultOpenKeys)
  return (
    <>
      <Helmet>
        <title>{pageContext.frontmatter.title}</title>
      </Helmet>
      <Layout
        style={{
          background: "#111",
        }}
      >
        <Layout.Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[uri]}
            style={{ height: "100%" }}
            mode="inline"
          >
            <Logo />
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

interface SiteLink {
  name: string
  link: string
  links?: SiteLink[]
}

const renderMenuItem: FC<SiteLink> = ({ name, link, links }) => {
  if (links === undefined) {
    return (
      <Menu.Item key={link}>
        <Link to={link}>{name}</Link>
      </Menu.Item>
    )
  }

  return (
    <Menu.SubMenu key={link} title={<span>{name}</span>}>
      {links.map(l => ({ ...l, link: `${link}${l.link}` })).map(renderMenuItem)}
    </Menu.SubMenu>
  )
}

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
      }}
    >
      <img style={{ width: 50 }} src={require("../images/logo-dark.svg")} />
      <p
        style={{
          marginTop: 10,
          fontSize: 18,
          lineHeight: "initial",
          marginBottom: 0,
        }}
      >
        Fielder
      </p>
    </div>
  )
}

export default Shell

// const components = {
//   code: Code,
// }
