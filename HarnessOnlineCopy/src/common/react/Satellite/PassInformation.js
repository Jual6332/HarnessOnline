import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import satImage from './sat-image.png';
import Circle from './Circle';
import SatelliteIcon from '../core/Svgs/Satellite';
import {
  $GreenDark,
  $GreyDark,
  $GreyLight,
  $SecondaryColor
} from '../core/Variables';
import clientUrlUtil from '../../utilities/clientUrl';
import {PASS_ACTIVITY, VEHICLE_DETAILS} from '../../utilities/constants';

const clientUrl = clientUrlUtil();

const Header = styled.p`
  font-size: 32px;
  color: ${$SecondaryColor};
  text-align: center;
`;

const PassInfoPA = styled.div`
  display: inline-block;
  padding: 10px;
  color: ${$GreyDark};

  p {
    &:nth-of-type(1) {
      margin-bottom: 10px;
      color: ${$GreyLight};
      font-size: 18px;
    }

    &:nth-of-type(2) {
      font-size: 26px;
      font-weight: bold;
    }

    &:nth-of-type(3) {
      font-size: 26px;
    }
  }
`;

const SatelliteWrap = styled.div`
  margin: 15px 0;

  svg {
    height: 50px;
    width: 50px;
    fill: ${$GreenDark};
  }
`;

const ScInfo = styled.div`
  text-align: left;

  img  {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const TR = styled.tr`
  ${props => {
    return props.paddingTop && `
      td {
        padding-top: 15px;
      }
    `;
  }}

  td:nth-of-type(1) {
    width: 100px;
    font-weight: 500;

    ${props => props.uppercase && 'text-transform: uppercase;' }
  }

  td:nth-of-type(2) {
    ${props => props.green && `color: ${$GreenDark};` }
  }
`;

const PassInformation = props => {
  const {
    locationLP,
    locationNP,
    scid,
    scidData,
    timeLP,
    timeNP,
    type
  } = props;
  let panel = null;

  if (type === PASS_ACTIVITY) {
    panel = (
      <div>
        <SatelliteWrap>
          <SatelliteIcon/>
        </SatelliteWrap>
        <Circle
          passLocation='Svalbard, Norway'
          passTime='12m 52s'
        />
        <PassInfoPA>
          <p>Next Pass</p>
          <p>{locationNP}</p>
          <p>{timeNP}</p>
        </PassInfoPA>
        <PassInfoPA>
          <p>Previous Pass</p>
          <p>{locationLP}</p>
          <p>{timeLP}</p>
        </PassInfoPA>
      </div>
    );
  }

  if (type === VEHICLE_DETAILS) {
    panel = (
      <ScInfo>
        <img src={`${clientUrl}${satImage}`}/>
        <table>
          <tbody>
            { scidData && _.map(scidData, (value, key) => {
              return (
                <TR uppercase key={`${key}-${value}`}>
                  <td>{key}</td>
                  <td>{value}</td>
                </TR>
              );
            }) }
            <TR green paddingTop>
              <td>Last Pass</td>
              <td>{locationLP} {timeLP}</td>
            </TR>
            <TR>
              <td>Next Pass</td>
              <td>{locationNP} {timeNP}</td>
            </TR>
          </tbody>
        </table>
      </ScInfo>
    );
  }

  return (
    <div>
      <Header>Satellite {scid}</Header>
      {panel}
    </div>
  );
};

PassInformation.propTypes = {
  locationLP: PropTypes.string,
  locationNP: PropTypes.string,
  scid: PropTypes.string,
  scidData: PropTypes.object,
  timeLP: PropTypes.string,
  timeNP: PropTypes.string,
  type: PropTypes.string
};

export default PassInformation;
