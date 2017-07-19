import _ from 'lodash';

import buildRequest from './buildRequest';
import handleResponse from './handleResponse';

const TIMEOUT_MS = 5000;

/**
 * Default values for the options object
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
  headers: {},
  logger: null,
  timeout: TIMEOUT_MS
};

/**
 * Creates a promise that resolves
 * @param {Number} timeoutMS the timeout interval in ms
 * @returns {Function} Returns a promise resolves in x milliseconds
 */
function timeout (timeoutMS) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        error: new Error('request timeout'),
        timedOut: true
      });
    }, timeoutMS);
  });
}

/**
 * Makes a get request via fetch
 * @param {Object} reqConf the request configuration object
 * @param {Object} options options to choose from
 * @return {Promise} a promise for the call
 */
export function get (reqConf, options = {}) {
  const opts = _.merge({}, DEFAULT_OPTIONS, options);
  const request = buildRequest(reqConf);
  const headers = request.headers || {};

  if (opts.logger) {
    opts.logger('GET:', request.url);
  }

  return Promise.race([fetch(request.url,
    {
      headers
    }), timeout(opts.timeout)])
    .then(handleResponse(opts));
}

/**
 * Makes a post request via fetch
 * @param {Object} reqConf the request configuration object
 * @param {Object} body the body to send
 * @param {Object} options options to choose from
 * @return {Promise} a promise for the call
 */
export function post (reqConf, body = {}, options = {}) {
  const opts = _.merge({}, DEFAULT_OPTIONS, options);
  const request = buildRequest(reqConf);
  const headers = _.merge({
    'Content-Type': 'application/json'
  }, request.headers || {});

  if (opts.logger) {
    opts.logger('POST:', request.url);
  }

  return Promise.race([fetch(request.url,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    }), timeout(opts.timeout)])
    .then(handleResponse(opts));
}

/**
 * Makes a put request via fetch
 * @param {Object} reqConf the request configuration object
 * @param {Object} body the body to send
 * @param {Object} options options to choose from
 * @return {Promise} a promise for the call
 */
export function put (reqConf, body = {}, options = {}) {
  const opts = _.merge({}, DEFAULT_OPTIONS, options);
  const request = buildRequest(reqConf);
  const headers = _.merge({
    'Content-Type': 'application/json'
  }, request.headers || {});

  if (opts.logger) {
    opts.logger('PUT:', request.url);
  }

  return Promise.race([fetch(request.url,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    }), timeout(opts.timeout)])
    .then(handleResponse(opts));
}
