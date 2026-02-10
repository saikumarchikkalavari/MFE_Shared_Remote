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
  optimization: {
    usedExports: true,
    minimize: !isDevelopment,
    sideEffects: false,  // Enable better tree-shaking
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
        './auth': './src/auth',
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
          eager: false,
        },
        'date-fns': {
          singleton: true,
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],
};
