import {get, post, put} from '../../common/utilities/fetch';
import logger from '../../common/utilities/logger';

/**
 * Handle request for data on the server
 * This lets us get around cors problems
 * Client sends the endpoint, body, options and the method
 *   to use all inside of the request's body
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {void} returns nothing
 */
export default function (req, res) {
  const {method, endpoint, body, options} = req.body;
  const methodTree = {get, post, put};
  const apiMethod = methodTree[method] || get;
  const bodyOpts = method === 'put' || method === 'post' ? body : options;

  apiMethod(endpoint, bodyOpts, options)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      logger.error('Error in the apiController');
      logger.error(typeof err === 'object' ? JSON.stringify(err) : err);
      res.send({endpoint, error: err});
    });
}
