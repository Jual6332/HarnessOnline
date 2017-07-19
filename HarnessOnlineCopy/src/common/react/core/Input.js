import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import MenuDown from './Svgs/MenuDown';
import TextInput from './TextInput';

const MenuWrap = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: 2px;
  height: 30px;
  width: 30px;

  svg {
    fill: #ABB3B1;
  }
`;

const ScTextInput = styled(TextInput)`
  width: calc(100% - 115px);
  padding: 5px;
  border: 0;
  border-bottom: 1px solid #CCC;
  font-weight: 300;
`;

const ScTextAreaInput = styled.textarea`
  width: 100%;
  height: 145px;
`;

const Select = styled.select`
  width: calc(100% - 107px);
  display: inline-block;
  padding: 5px;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #CCC;
  appearance: none;
  border-radius: 0;
  cursor: pointer;
  font-weight: 300;
  background: none;
`;

const Title = styled.p`
  display: inline-block;
  width: 100px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;

  ${props => {
    return props.block && `
      display: block;
      margin-bottom: 5px;
    `;
  }}
`;

const Input = props => {
  const {children, handleChange, targetKey, title, type} = props;

  // TextInput already has a function similar to this
  const handleInputChange = key => {
    return ev => {
      handleChange(ev.target.value, key);
    };
  };

  if (type === 'select') {
    return (
      <div>
        <Title>{title}</Title>
        <MenuWrap><MenuDown/></MenuWrap>
        <Select
          {...props}
          onChange={handleInputChange(targetKey)}
        >{children}</Select>
      </div>
    );
  } else if (type === 'text') {
    return (
      <div>
        <Title>{title}</Title>
        <ScTextInput {...props} onChange={handleChange}/>
      </div>
    );
  } else if (type === 'textArea') {
    return (
      <div>
        <Title block>{title}</Title>
        <ScTextAreaInput
          {...props}
          onChange={handleInputChange(targetKey)}
        />
      </div>
    );
  }

  return null;
};

Input.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  handleChange: PropTypes.func,
  targetKey: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};

export default Input;
