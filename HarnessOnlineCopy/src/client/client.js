import 'babel-polyfill';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import App from '../common/react/App';
import reducers from '../common/redux/reducers';

/**
 * @param {Function} fn A function to run once the DOM is loaded
 * @return {Void} Returns nothing
 */
function checkDom (fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState !== 'loading') {
        fn();
      }
    });
  }
}

/**
 * Creates the react components with data sent from the server
 * @return {Void} Returns nothing
 */
function renderPage () {
  let renderElement = null;

  // Grab the state from a global injected into server-generated HTML
  const initialState = window.__INITIAL_STATE__;
  const clientUrl = _.get(initialState, 'AppStore.clientUrl', '');

  // Create redux store for app state with initial state
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  );

  renderElement = (
    <BrowserRouter basename={clientUrl}>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  );

  // Fire the render
  render(renderElement, document.getElementById('root'));
}

checkDom(renderPage);
