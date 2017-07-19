import HttpStatus from 'http-status-codes';
import _ from 'lodash';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Helmet from 'react-helmet';
import {Provider} from 'react-redux';
import {matchPath, StaticRouter} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {ServerStyleSheet} from 'styled-components';
import url from 'url';

import App from '../../common/react/App';
import routesConfig from '../../common/react/routes';
import reducers from '../../common/redux/reducers';
import indexHTML from '../../common/utilities/indexHtml';
import clientUrlUtil from '../../common/utilities/clientUrl';
import isProdUtil from '../../common/utilities/isProd';
import logger from '../../common/utilities/logger';
import {version} from '../../../package.json';

const isProd = isProdUtil();
const clientUrl = clientUrlUtil();

/**
 * Generate the react component for the page
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Object} state the application state
 * @return {Void} Sends the stringifyied page
 */
function sendPage (req, res, state = {AppStore: {}}) {
  const context = {};
  let element = '';

  if (state.ErrorStore && state.ErrorStore.code) {
    res.status(state.ErrorStore.code);
  }

  // Create redux store and initial state
  const reduxStore = createStore(
    reducers,
    state,
    applyMiddleware(thunk)
  );
  const initialState = reduxStore.getState();

  element = (
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </StaticRouter>
  );

  // Render to string and configure other parts of the page
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(element));
  const helmet = Helmet.renderStatic();
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `;
  const styles = sheet.getStyleTags();

  // Template the body
  const payload = indexHTML({
    appLink: isProd ?
      `${clientUrl}${global.webpackAssets.app.js}` : '/assets/js/app.js',
    body,
    head,
    manifest: isProd ?
      global.webpackManifest : null,
    state: initialState,
    styles,
    vendorLink: isProd ?
      `${clientUrl}${global.webpackAssets.vendor.js}` : '/assets/js/vendor.js',
    version
  });

  // Send the rendered page to the client
  res.send(payload);
}

/**
 * Middleware to server side render the page and send it to the client
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @return {Void} Sends the requested page
 */
export default function (req, res) {
  const reqUrl = url.parse(req.url).pathname || req.url;
  const currentRoute = _.find(routesConfig, route => {
    return matchPath(reqUrl, route);
  });
  const params = _.merge({}, req.params, req.query);
  const store = {AppStore: {params, clientUrl}};

  if (_.isNull(currentRoute) || _.isUndefined(currentRoute)) {
    logger.error(
      `Url ${req.url} was requested. ${HttpStatus.NOT_FOUND} response sent.`
    );

    sendPage(req, res, {...store, ErrorStore: {code: HttpStatus.NOT_FOUND}});
  } else {
    sendPage(req, res, store);
  }
}
