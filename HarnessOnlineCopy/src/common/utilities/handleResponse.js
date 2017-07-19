/* eslint no-unused-vars:0 */
import _ from 'lodash';
import HttpStatus from 'http-status-codes';

/**
 * Handles errors and validation from the API response
 * @param {Object} options options to choose from
 * @returns {Func} returns function to handle the response
 */
export default function (options) {
  return function (response) {
    const badResponseCodes = [
      HttpStatus.MOVED_PERMANENTLY,
      HttpStatus.BAD_REQUEST,
      HttpStatus.NOT_FOUND,
      HttpStatus.SERVICE_UNAVAILABLE,
      HttpStatus.UNAUTHORIZED
    ];
    let err = null;
    let responsePayload = null;

    if (response.timedOut) {
      err = response;
    } else if (_.includes(badResponseCodes, response.status)) {
      err = new Error({
        error: response.statusText,
        status: response.status,
        response
      });
    } else if (response.status === HttpStatus.NO_CONTENT) {
      return {noContent: true};
    } else {
      const contentType = response.headers.get('Content-Type');

      if (
        contentType
          && (
          contentType.includes('text')
          || contentType.includes('xml')
          || contentType.includes('html')
        )
      ) {
        responsePayload = response.text();
      } else {
        responsePayload = response.json();
      }
    }

    if (err) {
      throw err;
    } else {
      return responsePayload;
    }
  };
}
