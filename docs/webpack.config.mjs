import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import remarkSlug from 'remark-slug';
import remarkPrism from 'remark-prism';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
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
      wouter: 'wouter-preact',
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
              remarkPlugins: [remarkSlug, remarkPrism],
            },
          },
        ],
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: ['./src/robots.txt'],
    }),
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
        appName: 'Fielder Docs',
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
      prefix: '/manifest/',
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, './src/service-worker.tsx'),
      exclude: [/manifest\//, /fonts\//],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
