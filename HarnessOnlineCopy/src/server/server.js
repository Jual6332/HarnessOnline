import 'es6-promise/auto';
import 'isomorphic-fetch';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import apiController from './controllers/apiController';
import healthController from './controllers/healthController';
import reactController from './controllers/reactController';
import removeTrailingSlash from './middleware/removeTrailingSlash';
import config from '../common/config/config';
import isProdUtil from '../common/utilities/isProd';
import logger from '../common/utilities/logger';

const conf = config();
const isProd = isProdUtil();
const jsonParser = bodyParser.json();
const server = express();

// Load webpack files into memory
global.webpackAssets = {};
global.webpackManifest = {};

if (isProd) {
  fs.readFile(path.resolve(__dirname, '..', 'assets', 'webpack-assets.json'), (err, data) => {
    if (err) {
      logger.error('Error reading webpack-manifest.json');
    }
    global.webpackAssets = JSON.parse(data);
  });

  fs.readFile(path.resolve(__dirname, '..', 'assets', 'webpack-manifest.json'), (err, data) => {
    if (err) {
      logger.error('Error reading webpack-manifest.json');
    }
    global.webpackManifest = `window.webpackManifest = ${JSON.stringify(JSON.parse(data))}`;
  });
}

// Cors
server.use(cors());

// Compression
server.use(compression());

// Static files
server.use(express.static(path.resolve(__dirname, '..')));
server.use(express.static(path.resolve(__dirname, '..', 'assets')));

// Clean up the request url
server.use(removeTrailingSlash);

// Routes for the server
server.post('/server', jsonParser, apiController);
server.get('/health', healthController);

// Setup server side rendering of React pages
server.get('*', reactController);

// Start up server
if (!module.parent) {
  server.listen(conf.server.port, error => {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`server started on port: ${conf.server.port}`);
    }
  });
}

export default server;
