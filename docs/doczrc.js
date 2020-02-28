export default {
  name: 'Fielder',
  description: 'Documentation for Fielder',
  files: ['src/**/*.mdx'],
  menu: ['About', 'Guides', 'Api', 'Examples'],
  repository: 'https://github.com/andyrichardson/fielder',
  themeConfig: {
    initialColorMode: 'dark'
  },
  siteMetadata: {
    siteUrl: `http://localhost:9000`
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['*']
      }
    }
  ]
};
