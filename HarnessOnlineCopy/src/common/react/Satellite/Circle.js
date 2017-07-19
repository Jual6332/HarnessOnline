import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {$GreenDark, $GreyDark} from '../core/Variables';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0 auto 15px auto;
  border-radius: 50%;
  border: 7px solid ${$GreenDark};
`;

const Text = styled.div`
  color: ${$GreyDark};

  p:first-of-type {
    text-transform: uppercase;
  }
`;

const Place = styled.p`
  font-size: 28px;
`;

const Time = styled.p`
  color: ${$GreenDark};
  font-size: 48px;
`;

const Circle = props => {
  const {passLocation, passTime} = props;

  return (
    <Div>
      <Text>
        <p>In Pass With</p>
        <Place>{passLocation}</Place>
        <Time>{passTime}</Time>
      </Text>
    </Div>
  );
};

Circle.propTypes = {
  passLocation: PropTypes.string,
  passTime: PropTypes.string
};

export default Circle;
