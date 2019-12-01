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
        ],
      },
      {
        name: "API Reference",
        link: "/api-reference",
        links: [
          {
            name: "useForm",
            link: "/useForm",
          },
        ],
      },
    ],
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx"),
        },
      },
    },
    "gatsby-transformer-remark",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
