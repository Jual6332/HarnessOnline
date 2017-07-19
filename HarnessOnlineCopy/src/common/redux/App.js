/** Action Types **/
const SET_MODEL = 'APP/SET_MODEL';

/** Action Creators **/

/**
 * Set the type and display status of the modal
 * @param {Boolean} show should the modal be displayed
 * @param {String} type the type to set the modal
 * @return {Object} The action object (type is mandatory)
 */
export function setModal (show, type) {
  return {type: SET_MODEL, payload: {show, type}};
}

/** Actions **/

/**
 * Open the modal and set a type for it
 * @param {String} type the type to set the modal
 * @returns {Func} A func to accept redux's dispatch func
 */
export function openModal (type = '') {
  return function (dispatch) {
    dispatch(setModal(true, type));
  };
}

/**
 * Close the modal
 * @param {String} type the type to set the modal
 * @returns {Func} A func to accept redux's dispatch func
 */
export function closeModal () {
  return function (dispatch) {
    dispatch(setModal(false, ''));
  };
}

/** Reducer **/
const initialState = {
  displayModal: false,
  modelType: ''
};

/**
 * @param {Object} state the current state
 * @param {Object} action the action to be performed
 * @returns {Object} returns the new state object
 */
export default function reducer (state = initialState, action = {}) {
  let displayModal = null;
  let modelType = null;

  switch (action.type) {
    case SET_MODEL:
      const {show, type} = action.payload;

      displayModal = show || false;
      modelType = type || '';

      return {
        ...state,
        displayModal,
        modelType
      };
    default:
      return state;
  }
}
