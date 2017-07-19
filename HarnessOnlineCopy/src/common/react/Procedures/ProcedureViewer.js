import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import FileChart from '../core/Svgs/FileChart';
import {$SecondaryColor} from '../core/Variables';

const Div = styled.div`
  width: 90%;
  padding: 15px;
`;

const FileChartWrap = styled.div`
  display: inline-block;

  svg {
    cursor: pointer;
    fill: ${$SecondaryColor};
    height: 30px;
    width: 30px;
  }
`;

const Name = styled.p`
  display: inline-block;
  vertical-align: super;
  font-size: 24px;
  font-weight: 500;
  color: ${$SecondaryColor};
`;


const ProcedureViewer = props => {
  const {name} = props;

  if (_.isEmpty(props)) {
    return (
      <Div>
        <p>Select a procedure.</p>
      </Div>
    );
  }

  return (
    <Div>
      <div>
        <FileChartWrap>
          <FileChart/>
        </FileChartWrap>
        <Name>{name}</Name>
      </div>
    </Div>
  );
};

ProcedureViewer.propTypes = {
  name: PropTypes.string
};

export default ProcedureViewer;
