/* eslint-disable no-param-reassign */
import _ from 'lodash';

/**
 * Creates a query string from an object
 * @param {Object} query contains the query as keys and values
 * @returns {String} an object containing the url string and the query
 */
function createQS (query) {
  return _.reduce(query, (result, value, key) => {
    // result += `${key === Object.keys(query)[0] ? '&' : ''}${key}=${value}`;
    result += `&${key}=${value}`;
    return result;
  }, '?');
}

/**
 * Builds a useable request object based off the request config
 * Protocol: Add a colon and forward slashes
 * Port: Add a colon if it exists
 * Path: Join the path array.
 *    i.e. [v1, people, 000] -> /v1/people/000
 * @param {Object} reqConf the request configuration object
 * @returns {Object} an object containing the url string and the query
 */
export default function (reqConf) {
  const defaultRequest = {
    protocol: 'http',
    hostname: 'localhost',
    port: '',
    path: [],
    query: {}
  };
  const req = _.merge({}, defaultRequest, reqConf);

  req.url = [
    req.protocol ? `${req.protocol}://` : '',
    req.hostname ? req.hostname : '',
    req.port ? `:${req.port}` : '',
    req.path.length === 0 ? '/' : `/${req.path.join('/')}`,
    _.isEmpty(req.query) ? '' : createQS(req.query)
  ].join('');

  return req;
}
