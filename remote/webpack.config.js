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
    port: 5001,
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
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/pages/Dashboard',
        './Reports': './src/pages/Reports',
        './Analytics': './src/pages/Analytics',
      },
      remotes: {
        shared: 'shared@http://localhost:5002/remoteEntry.js',
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
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],
};
