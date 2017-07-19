import _ from 'lodash';

/**
 * Sort an array on a key and return it in ascending or descending order
 * @param {Array} array The data to sort
 * @param {Object} sort The key to sort on & a flag to asc or desc results
 * @return {Array} The sorted results
 */
export default function (array, sort) {
  let sortedArray = array;

  if (sort) {
    const {key, reverse} = sort;

    sortedArray = _.sortBy(sortedArray, key);

    if (reverse) {
      return sortedArray.reverse();
    }

    return sortedArray;
  }

  return sortedArray;
}
