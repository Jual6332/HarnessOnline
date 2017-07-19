import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  $Blue,
  $GreenLight,
  $Orange
} from './Variables';

const Status = styled.span`
  display: inline-block;
  height: 30px;
  width: 7px;
  background: ${$GreenLight};

  ${props => props.status
    && (props.status === 'OPEN' || props.status === 'TRIAGE')
    && `background: ${$Blue};` }
  ${props => props.status
    && props.status === 'URGENT' && `background: ${$Orange};` }
`;

const StatusBar = props => {
  const {status} = props;

  return <Status status={status && status.toUpperCase()}/>;
};

StatusBar.propTypes = {
  status: PropTypes.string
};

export default StatusBar;
