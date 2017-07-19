import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  z-index: 20;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  align-items: flex-start;
  background-color: rgba(185,209,220,.65);
  justify-content: center;
  overflow-y: auto;
  position: fixed;
`;

const Modal = props => {
  const {children} = props;

  return (
    <Div>{children}</Div>
  );
};

Modal.propTypes = {
  children: PropTypes.object
};

export default Modal;
