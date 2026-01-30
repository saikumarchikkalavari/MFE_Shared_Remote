const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 5002,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js'],
    },
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
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header',
        './SideNav': './src/components/SideNav',
        './DataTable': './src/components/DataTable',
        './Button': './src/components/Button',
        './DateSelector': './src/components/DateSelector',
        './MainContent': './src/components/MainContent',
        './theme': './src/theme',
        './api': './src/api',
        './types': './src/types',
        './Auth': './src/auth',
        './AppState': './src/appState',
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
        '@mui/material': {
          singleton: true,
        },
        '@emotion/react': {
          singleton: true,
        },
        '@emotion/styled': {
          singleton: true,
        },
        'ag-grid-react': {
          singleton: true,
        },
        'ag-grid-community': {
          singleton: true,
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
        '@mui/x-date-pickers': {
          singleton: true,
        },
        'date-fns': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
