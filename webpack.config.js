require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['whatwg-fetch', './example/src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'example/build'),
    publicPath: 'example/build/',
    filename: 'default.bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        WAYKE_SEARCH_URL: `"${process.env.WAYKE_SEARCH_URL}"`,
        WAYKE_SEARCH_MLT_URL: `"${process.env.WAYKE_SEARCH_MLT_URL}"`,
        WAYKE_SEARCH_X_API_KEY: `"${process.env.WAYKE_SEARCH_X_API_KEY}"`,
        WAYKE_GRAPH_QL_URL: `"${process.env.WAYKE_GRAPH_QL_URL}"`,
        WAYKE_ECOM_URL: `"${process.env.WAYKE_ECOM_URL}"`,
        GOOGLE_MAPS_API_KEY: `"${process.env.GOOGLE_MAPS_API_KEY}"`,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: ['./src/**/*.{ts,tsx,js,jsx}', './example/src/**/*.{ts,tsx,js,jsx}'],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: {
          test: /node_modules/,
          not: [/(([^\/]+?\/){1,2}(src|es6|dist\-web))/],
        },
        loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              allowTsInNodeModules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        loader: ['style-loader', 'css-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /build/, /__test__/],
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|jpg|woff|woff2|svg|eot|ttf|gif|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'example/build'),
    port: 5000,
    historyApiFallback: true,
    writeToDisk: true,
    allowedHosts: process.env.WAYKE_HOST
      ? process.env.WAYKE_HOST.replace(/\s/g, '').split(',')
      : undefined,
  },
};
