require('dotenv').config()
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['whatwg-fetch', './src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'default.bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        WAYKE_SEARCH_URL: `"${process.env.WAYKE_SEARCH_URL}"`,
        WAYKE_SEARCH_X_API_KEY: `"${process.env.WAYKE_SEARCH_X_API_KEY}"`,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: true,
    }),
  ],
  module: {
    rules: [
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
    contentBase: path.resolve(__dirname, 'build'),
    port: 5000,
    historyApiFallback: true,
    writeToDisk: true,
  },
};
