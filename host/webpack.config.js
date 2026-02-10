const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.ts',
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    port: 5000,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    usedExports: true,
    minimize: !isDevelopment,
    sideEffects: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        shared: 'shared@http://localhost:5002/remoteEntry.js',
        remote: 'remote@http://localhost:5001/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-router-dom': {
          singleton: true,
        },
        '@mui/material': {
          singleton: true,
          strictVersion: false,
        },
        '@mui/system': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
        },
        '@emotion/react': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^11.0.0',
        },
        '@emotion/styled': {
          singleton: true,
          strictVersion: false,
          requiredVersion: '^11.0.0',
        },
        '@tanstack/react-query': {
          singleton: true,
        },
        '@azure/msal-browser': {
          singleton: true,
        },
        '@azure/msal-react': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],
};
