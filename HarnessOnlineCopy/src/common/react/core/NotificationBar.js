import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Satellite from '../core/Svgs/Satellite';
import Alert from './Svgs/Alert';
import {
  $Blue,
  $GreenDark,
  $GreyLight,
  $Orange,
  $Purple
} from './Variables';

const Div = styled.div`
  margin-top: 12px;
  padding: 10px;
  background: ${$GreyLight};
  text-align: center;
  color: white;

  p {
    display: inline-block;
  }

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  ${props => props.color === 'blue' && `background: ${$Blue};` }
  ${props => props.color === 'green' && `background: ${$GreenDark};` }
  ${props => props.color === 'orange' && `background: ${$Orange};` }
  ${props => props.color === 'purple' && `background: ${$Purple};` }
`;

const IconWrap = styled.div`
  display: inline-block;
  vertical-align: middle;

  svg {
    height: 25px;
    width: 25px;
    fill: white;
  }
`;

const NotificationBar = props => {
  const {color, svg, title} = props;
  const SvgDict = {
    alert: Alert,
    default: Alert,
    satellite: Satellite
  };
  const Icon = SvgDict[svg] || SvgDict.default;

  return (
    <Div color={color}>
      <IconWrap>
        <Icon/>
      </IconWrap>
      <p>{title}</p>
    </Div>
  );
};

NotificationBar.propTypes = {
  color: PropTypes.string,
  svg: PropTypes.string,
  title: PropTypes.string
};

export default NotificationBar;
