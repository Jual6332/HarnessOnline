import PropTypes from 'prop-types';
import React from 'react';

const TextInput = props => {

  /**
   * Call the props handleChange
   * @param {Ojbect} ev the browser event
   * @return {Void} returns nothing
   */
  function handleChange (ev) {
    props.handleChange(ev.target.value, props.targetKey);
  }

  return (
    <input
      className={props.className}
      disabled={props.disabled}
      onBlur={props.handleBlur}
      onChange={handleChange}
      onFocus={props.handleFocus}
      onKeyUp={props.handleKeyUp}
      placeholder={props.placeholder}
      type='text'
      value={props.value}
    />
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
  handleKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  targetKey: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;
