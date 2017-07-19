/* eslint-disable
  no-process-env
*/
import _ from 'lodash';

import defaultConfig from './env/default.json';
import dev from './env/dev.json';
import prod from './env/prod.json';

const configObjects = {
  dev,
  production: prod
};
const appEnv = configObjects[process.env.NODE_ENV] || configObjects.dev;
const processConfig = {
  clientUrl: process.env.CLIENT_URL,
  endpoints: {
    anomalyReport: {
      linkerdId: process.env.AR_LINKERD_ID
    },
    linkerd: {
      hostname: process.env.LINKERD_HOST,
      port: process.env.LINKERD_PORT
    },
    mpe: {
      linkerdId: process.env.MPE_LINKERD_ID
    },
    scid: {
      linkerdId: process.env.SCID_LINKERD_ID
    },
    ticketer: {
      linkerdId: process.env.TICKET_LINKERD_ID
    },
    tlmSnapshot: {
      linkerdId: process.env.TLM_LINKERD_ID
    }
  }
  // server: {
  //   port: process.env.PORT
  // }
};
const config = _.merge({}, defaultConfig, appEnv, processConfig);

/**
 * Grabs config data based on environment
 * @param {Object} custom A custom config with data to override
 * @return {Object} The config data
 */
export default function (custom = {}) {
  return _.merge(config, custom);
}
