import HttpStatus from 'http-status-codes';
import url from 'url';

/**
 * Middleware to remove the trailing slash from a request
 * i.e. /hello/ and /hello will both be handled the same
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express next function
 * @return {Void} Either redirects or allows the page to next()
 */
export default function (req, res, next) {
  const urlObj = url.parse(req.url);

  if (urlObj.pathname.match(/\/$/) && urlObj.pathname.length > 1) {
    urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    const redirect = url.format(urlObj);

    res.redirect(HttpStatus.MOVED_PERMANENTLY, redirect);
  } else {
    return next();
  }
}
