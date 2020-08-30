module.exports = {
  siteMetadata: {
    title: `Fielder Docs`,
    description: `Docs`,
    author: `Andy Richardson`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [
          require("remark-slug"),
          require("remark-autolink-headings"),
          require("remark-prism"),
        ],
        defaultLayouts: {
          default: require.resolve("./src/components/layout.tsx"),
        },
      },
    },
  ],
}

// {
//   resolve: `gatsby-source-filesystem`,
//   options: {
//     name: `images`,
//     path: `${__dirname}/src/images`,
//   },
// },
// `gatsby-transformer-sharp`,
// `gatsby-plugin-sharp`,
// {
//   resolve: `gatsby-plugin-manifest`,
//   options: {
//     name: `gatsby-starter-default`,
//     short_name: `starter`,
//     start_url: `/`,
//     background_color: `#663399`,
//     theme_color: `#663399`,
//     display: `minimal-ui`,
//     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
//   },
// },
// // this (optional) plugin enables Progressive Web App + Offline functionality
// // To learn more, visit: https://gatsby.dev/offline
// // `gatsby-plugin-offline`,
