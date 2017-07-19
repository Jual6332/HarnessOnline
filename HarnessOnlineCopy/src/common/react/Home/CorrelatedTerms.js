import React from 'react';
import styled from 'styled-components';

import {
  $GreyLight,
  $SecondaryColor,
  $WarningYellow
} from '../core/Variables';

const Div = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  width: 100%;
  border: 4px solid ${$WarningYellow};
  text-align: center;
`;

const Label = styled.p`
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  color: ${$WarningYellow};
  text-transform: uppercase;
`;

const CorrelatedTerms = () => {
  return (
    <Div>
      <Label>MPH is not Running</Label>
    </Div>
  );
};

export default CorrelatedTerms;
