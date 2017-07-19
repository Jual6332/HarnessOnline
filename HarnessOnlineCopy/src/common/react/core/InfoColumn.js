import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Alert from './Svgs/Alert';
import AlertClock from './Svgs/AlertClock';
import CheckCircle from './Svgs/CheckCircle';
import Tags from './Svgs/Tags';
import {
  $Blue,
  $GreenLight,
  $GreyDark,
  $GreyLight,
  $Orange,
  $Purple
} from './Variables';

const Column = styled.div`
  box-sizing: border-box;
  width: 25%;
  display: inline-block;
  color: ${$GreyDark};
  border-right: 1px solid ${$GreyLight};
  text-align: center;
  text-transform: uppercase;

  ${props => props.width && `width: ${props.width}%;` }}

  svg {
    margin-top: 5px;
    fill: ${$GreyLight};
    height: 30px;
    width: 30px;
  }

  p:nth-of-type(2) {
    font-weight: 500;
  }

  &:last-of-type {
    border-right: none
  }
`;

const Number = styled.p`
  font-size: 48px;
  font-weight: 300;

  ${props => props.color === 'blue' && `color: ${$Blue};` }
  ${props => props.color === 'green' && `color: ${$GreenLight};` }
  ${props => props.color === 'orange' && `color: ${$Orange};` }
  ${props => props.color === 'purple' && `color: ${$Purple};` }
`;

const InfoColumn = props => {
  const {color, number, svg, title, width} = props;
  const SvgDict = {
    anomalyReports: Alert,
    default: CheckCircle,
    events: AlertClock,
    openTickets: Tags,
    ticketsResolved: CheckCircle
  };
  const Icon = SvgDict[svg] || SvgDict.default;

  return (
    <Column width={width}>
      <Number color={color}>{number}</Number>
      <p>{title}</p>
      <Icon/>
    </Column>
  );
};

InfoColumn.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  svg: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number
};

export default InfoColumn;
