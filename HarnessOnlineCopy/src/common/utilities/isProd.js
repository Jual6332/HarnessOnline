/* eslint-disable no-process-env */

/**
 * Determines if we are in production
 * @return {Boolean} A flag with the result
 */
export default function () {
  const isProd = process.env.NODE_ENV === 'production';

  return isProd;
}
