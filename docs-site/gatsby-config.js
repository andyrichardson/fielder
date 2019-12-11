module.exports = {
  siteMetadata: {
    title: `Fielder`,
    description: `Description here`,
    author: `Andy Richardson (andyrichardson)`,
    menuLinks: [
      {
        name: "About",
        link: "/",
      },
      {
        name: "Documentation",
        link: "/documentation",
        links: [
          {
            name: "Validation",
            link: "/validation",
          },
          {
            name: "Field lifecycle",
            link: "/field-lifecycle",
          },
          {
            name: "Type safety",
            link: "/type-safety",
          },
        ],
      },
      {
        name: "API Reference",
        link: "/api-reference",
        links: [
          {
            name: "useField",
            link: "/useField",
          },
          {
            name: "useForm",
            link: "/useForm",
          },
          {
            name: "useFormContext",
            link: "/useFormContext",
          },
          {
            name: "types",
            link: "/types",
          },
        ],
      },
    ],
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
          },
        ],
        gatsbyRemarkPlugins: [
          `gatsby-transformer-remark`,
          {
            resolve: "gatsby-remark-autolink-headers",
          },
          {
            resolve: "gatsby-remark-prismjs",
          },
        ],
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx"),
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
