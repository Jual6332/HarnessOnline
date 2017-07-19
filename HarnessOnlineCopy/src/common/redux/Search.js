/** Action Types **/
const SET_INPUT = 'SEARCH/SET_INPUT';

/** Action Creators **/

/**
 * Set the value for a key
 * @param {String} key the key to set
 * @param {String} value the value to set
 * @return {Object} The action object (type is mandatory)
 */
export function setInput (key = '', value = '') {
  return {type: SET_INPUT, payload: {key, value}};
}

/** Actions **/

/** Reducer **/
const initialState = {
  input: {}
};

/**
 * @param {Object} state the current state
 * @param {Object} action the action to be performed
 * @returns {Object} returns the new state object
 */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_INPUT:
      const {key, value} = action.payload;

      return {
        ...state,
        input: {
          ...state.input,
          [key]: value
        }
      };
    default:
      return state;
  }
}
