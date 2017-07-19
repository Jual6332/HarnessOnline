import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InfoColumn from '../core/InfoColumn';
import MenuDown from '../core/Svgs/MenuDown';
import {
  $GreyDark
} from '../core/Variables';

const Banner = styled.p`
  margin: 15px 0;
  color: ${$GreyDark};
  text-transform: uppercase;
  font-weight: 500;
`;

const Div = styled.div`
  margin-bottom: 10px;
`;

const MenuWrap = styled.span`
  position: absolute;
  margin-top: -5px;
  margin-left: 5px;
  height: 25px;
  width: 25px;

  svg {
    fill: ${$GreyDark};
  }
`;

const SnapShot = props => {
  const {
    anomalyReports,
    events,
    openTickets,
    ticketsResolved,
    timeFrame
  } = props;
  const time = {
    24: '24hr'
  }[timeFrame] || '24hr';

  return (
    <Div>
      <Banner>
        {time} Snapshot
        <MenuWrap>
          <MenuDown/>
        </MenuWrap>
      </Banner>
      <InfoColumn
        color='blue'
        number={events}
        svg='events'
        title='Events'
      />
      <InfoColumn
        color='orange'
        number={anomalyReports}
        svg='anomalyReports'
        title='Anomaly Reports'
      />
      <InfoColumn
        color='purple'
        number={openTickets}
        svg='openTickets'
        title='Open Tickets'
      />
      <InfoColumn
        color='green'
        number={ticketsResolved}
        svg='ticketsResolved'
        title='Tickets Resolved'
      />
    </Div>
  );
};

SnapShot.propTypes = {
  anomalyReports: PropTypes.number,
  events: PropTypes.number,
  openTickets: PropTypes.number,
  ticketsResolved: PropTypes.number,
  timeFrame: PropTypes.string
};

export default SnapShot;
