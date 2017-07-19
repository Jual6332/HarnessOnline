import React from 'react';
import styled from 'styled-components';
import Alert from '../core/Svgs/Alert';

import {
  $Background,
  $GreenDark,
  $GreyLight,
  $SecondaryColor,
  $WarningYellow
} from '../core/Variables';

const DivPass = styled.div`
  background: ${$GreenDark};
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  width: 100%;
  border: 4px solid ${$GreenDark};
  text-align: center;

  svg {
    vertical-align: top;
    margin-right: 5px;
    fill: ${$Background};
    height: 25px;
    width: 25px;
  }
`;

const DivFail = styled.div`
  background: ${$WarningYellow};
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  width: 100%;
  border: 4px solid ${$WarningYellow};
  text-align: center;

  svg {
    vertical-align: top;
    margin-right: 5px;
    fill: ${$Background};
    height: 25px;
    width: 25px;
  }
`;

const Label = styled.p`
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  color: ${$Background};
  text-transform: uppercase;
`;

const HarnessStatusBar = (props) => {
  if (props.check){
    return (
      <DivPass>
        <Label>{props.status}</Label>
      </DivPass>
    );
  }else{
    return (
      <DivFail>
        <Alert/>
        <Label>{props.status}</Label>
        <Alert/>
      </DivFail>
    );
  }
};

export default HarnessStatusBar;
