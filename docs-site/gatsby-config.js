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
            name: "Getting Started",
            link: "/getting-started",
          },
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
            name: "FielderProvider",
            link: "/FielderProvider",
          },
        ],
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-plugin-less",
      options: {
        modifyVars: {
          ...require("antd/dist/dark-theme"),
          "primary-color": "#fff",
          // @link-color: #1890ff; // link color
          // @success-color: #52c41a; // success state color
          // @warning-color: #faad14; // warning state color
          // @error-color: #f5222d; // error state color
          // @font-size-base: 14px; // major text font size
          // @heading-color: rgba(0, 0, 0, 0.85); // heading text color
          // @text-color: rgba(0, 0, 0, 0.65); // major text color
          // @text-color-secondary : rgba(0, 0, 0, .45); // secondary text color
          // @disabled-color : rgba(0, 0, 0, .25); // disable state color
          // @border-radius-base: 4px; // major border radius
          // @border-color-base: #d9d9d9; // major border color
          // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // major shadow for layers
        },
        javascriptEnabled: true,
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
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
