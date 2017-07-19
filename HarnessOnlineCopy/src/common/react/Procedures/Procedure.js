import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import FileChart from '../core/Svgs/FileChart';
import {$GreyLight, $SecondaryColor} from '../core/Variables';

const Div = styled.div`
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: ${$GreyLight};
  }

  & > div:nth-child(2) {
    display: inline-block;
    vertical-align: top;
    width: 90%;
  }

  ${props => props.selected && `
    background: ${$GreyLight};
  ` }
`;

const FileChartWrap = styled.div`
  display: inline-block;

  svg {
    cursor: pointer;
    fill: ${$SecondaryColor};
    height: 40px;
    width: 40px;
  }
`;

const Name = styled.p`
  font-weight: 500;
  color: ${$SecondaryColor};
`;

const Size = styled.p`
  display: inline-block;
  font-size: 12px;
  float: right;
`;

const Updated = styled.p`
  display: inline-block;
  font-size: 12px;
`;

const Procedure = props => {
  const {handleClick, lastUpdated, name, selected, size, uid} = props;

  return (
    <Div
      onClick={_.partial(handleClick, uid)}
      selected={selected}
    >
      <FileChartWrap>
        <FileChart/>
      </FileChartWrap>
      <div>
        <Name>{name}</Name>
        <Updated>{lastUpdated}</Updated>
        <Size>{size}</Size>
      </div>
    </Div>
  );
};

Procedure.propTypes = {
  handleClick: PropTypes.func,
  lastUpdated: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  size: PropTypes.string,
  uid: PropTypes.number
};

export default Procedure;
