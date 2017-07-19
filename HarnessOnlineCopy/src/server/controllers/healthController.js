/* eslint-disable no-process-env */
import npmJson from '../../../package.json';

const env = process.env.APP_ENV || 'dev';

/**
 * Sends app version and env info to front end
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {void} returns nothing
 */
export default function (req, res) {
  res.json({
    name: npmJson.name,
    version: npmJson.version,
    env
  });
}
