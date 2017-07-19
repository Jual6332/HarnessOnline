import _ from 'lodash';

/**
 * Utility method for binding methods in component constructors
 * @param {Object} context context to bind to
 * @param {Array} methods methods The array of method names
 * @return {Void} Returns nothing
 */
export function bindMethods (context, methods) {
  _.forEach(methods, method => {
    if (_.isFunction(context[method])) {
      context[method] = context[method].bind(context);
    }
  });
}

/**
 * Function to get the DOM's dimensions
 * @return {Void} Returns nothing
 */
export function getDOM () {
  let element = null;

  if (typeof document !== 'undefined') {
    const documentBody = document.body;
    const documentElement = document.documentElement;

    element = documentBody;

    if (navigator.userAgent.indexOf('MSIE ') > -1
      || ((navigator.appName === 'Microsoft Internet Explorer')
      || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})').exec(navigator.userAgent) !== null)))
      || navigator.userAgent.indexOf('Firefox') > -1) {
      element = documentElement;
    }
  }

  return element;
}

/**
 * Generic set ref method
 * @param {Element|Object} ref The ref to element/instance
 * @param {String} key The key to be stored on the instance
 * @param {Object} context The context to be set to
 * @returns {Void} Returns nothing
 */
export function setRef (ref, key, context) {
  if (ref && _.isString(key)) {
    context[key] = ref;
  }
}
