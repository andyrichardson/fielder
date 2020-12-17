const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mdx', '.woff2'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      buble: '@philpl/buble',
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', '@linaria/webpack-loader'],
      },
      {
        test: /\.mdx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [require('remark-slug'), require('remark-prism')],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          // 'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // new CompressionPlugin(),
    // new BundleAnalyzerPlugin(),
    new HTMLWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new FaviconsWebpackPlugin({
      mode: 'webapp',
      cache: true,
      logo: path.resolve(__dirname, './src/assets/icon.svg'),
      inject: true,
      favicons: {
        // Manifest file
        appName: 'Fielder',
        appDescription: 'Fielder docs',
        start_url: '/',
        display: 'standalone',
        background: '#fff',
        theme_color: '#000',
        orientation: 'portrait',
        // Icons
        icons: {
          coast: false,
          yandex: false,
          windows: false,
        },
      },
      outputPath: './manifest',
      prefix: '/manifest',
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, './src/service-worker.tsx'),
      exclude: [/manifest\//, /fonts\//],
    }),
  ],
};
