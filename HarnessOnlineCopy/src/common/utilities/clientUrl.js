import isProd from './isProd';
import config from '../config/config';

const conf = config();

/**
 * Builds path for the client url
 * @return {String} The url representative of where the client is living
 */
export default function () {
  let clientUrl = '';

  if (conf.clientUrl) {
    clientUrl = conf.clientUrl;
  }

  return isProd() ? clientUrl : '';
}
