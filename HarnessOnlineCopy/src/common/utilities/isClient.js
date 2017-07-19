/**
 * Determines if we are on the client or server
 * @return {Boolean} A flag with the result
 */
export default function () {
  const isClient = (typeof window !== 'undefined' && window.document);

  return isClient;
}
