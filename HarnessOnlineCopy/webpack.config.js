const _ = require('lodash');
const AssetsPlugin = require('assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

// eslint-disable-next-line no-unused-vars
const commonConfig = DEBUG => {
  return ({
    output: {
      publicPath: '/assets/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'images/[name]__[hash:base64:5].[ext]',
                limit: 1000
              }
            }
          ]
        }
      ]
    }
  });
};
const backend = DEBUG => {
  const commonConf = commonConfig(DEBUG);

  return (
    _.merge({}, commonConf, {
      entry: path.resolve(__dirname, 'src', 'server', 'server.js'),
      output: {
        path: path.resolve(__dirname, 'build', 'server'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
      },
      devtool: DEBUG ? 'cheap-module-source-map' : false,
      target: 'node',
      externals: [nodeExternals()],
      node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
      },
      module: {
        rules: commonConf.module.rules.concat([])
      }
    })
  );
};
const frontend = DEBUG => {
  const commonConf = commonConfig(DEBUG);

  return (
    _.merge({}, commonConf, {
      entry: {
        app: path.resolve(__dirname, 'src', 'client', 'client.js'),
        vendor: [
          'es6-promise',
          'http-status-codes',
          'isomorphic-fetch',
          'lodash',
          'prop-types',
          'react',
          'react-dom',
          'react-helmet',
          'react-redux',
          'react-router-dom',
          'redux',
          'redux-thunk',
          'styled-components'
        ]
      },
      output: {
        path: path.resolve(__dirname, 'build', 'assets'),
        filename: DEBUG ? 'js/[name].js' : 'js/[name].[chunkhash].js'
      },
      devtool: DEBUG ? 'cheap-module-source-map' : false,
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
        })
      ].concat(DEBUG ? []
        : [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new AssetsPlugin({path: path.resolve(__dirname, 'build', 'assets')}),
          new ChunkManifestPlugin({filename: 'webpack-manifest.json', manifestVariable: 'webpackManifest'}),
          new UglifyJSPlugin()
        ]
      ),
      module: {
        rules: commonConf.module.rules.concat([])
      }
    })
  );
};

module.exports = env => {
  const DEBUG = env !== 'prod';

  return [backend(DEBUG), frontend(DEBUG)];
};
