import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import styled from 'styled-components';

import Actions from './Actions';
import PassInformation from './PassInformation';
import TabTable from './TabTable';
import InfoColumn from '../core/InfoColumn';
import NotificationBar from '../core/NotificationBar';
import Telemetry from '../core/Telemetry';
import {$GreyDark, $GreyLight, $SecondaryColor} from '../core/Variables';
import config from '../../config/config';
import {MODAL_TELEM, PASS_ACTIVITY, VEHICLE_DETAILS} from '../../utilities/constants';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {
  anomalyReport: anomalyReportEP, linkerd, scid: scidEP, ticketer: ticketerEP
} = endpoints;

const Banner = styled.div`
  margin-top: 5px;
  border-top: 1px solid ${$GreyLight};
`;

const LeftCol = styled.div`
  display: inline-block;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
  width: 35%;
  vertical-align: top;
  text-align: center;
`;

const RightCol = styled.div`
  display: inline-block;
  padding-right: 10px;
  box-sizing: border-box;
  width: 65%;
  vertical-align: top;
  box-sizing: border-box;
  border-left: 1px solid ${$GreyLight};
`;

const Tab = styled.p`
  display: inline-block;
  padding: 15px 50px;
  border-top: 5px solid white;
  color: ${$GreyDark};
  cursor: pointer;

  ${props => props.selected && `
    border-color: ${$SecondaryColor};
    color: ${$SecondaryColor};
  ` }
`;

const TelemetryWrap = styled.div`
  position: absolute;
  width: 100%;

  & > div:first-child {
    margin: 20px auto 0px auto;
  }
`;

class Satellite extends Component {
  static propTypes = {
    displayModal: PropTypes.bool,
    match: PropTypes.object,
    modelType: PropTypes.string
  };

  constructor (props) {
    super(props);

    const scid = _.get(props, 'match.params.scid', '');

    this.state = {
      error: false,
      panel: PASS_ACTIVITY,
      reports: [],
      scid: {},
      telem: {},
      tickets: []
    };

    this.endpoints = [
      {
        ...linkerd,
        path: [
          anomalyReportEP.linkerdId, ...anomalyReportEP.reportsPath, scid
        ],
        dataLocation: 'reports'
      },
      {
        ...linkerd,
        path: [
          scidEP.linkerdId, ...scidEP.satellitePath, 'OW0005'
        ],
        dataLocation: 'scid'
      },
      {
        ...linkerd,
        path: [
          ticketerEP.linkerdId, ...ticketerEP.issuesPath
        ],
        query: {
          resolution: 'Unresolved',
          spacecraft: scid
        },
        dataLocation: 'tickets'
      }
    ];

    bindMethods(this, [
      'handleViewSwitch'
    ]);
  }

  componentDidMount () {
    const newState = {};

    Promise.all(
      _.map(this.endpoints, endpoint => {
        return get(endpoint);
      })
    )
      .then(data => {
        _.map(this.endpoints, (endpoint, index) => {
          newState[endpoint.dataLocation] = data[index];
        });

        this.setState({...this.state, ...newState});
      })
      .catch(err => {
        logger.error('err', err);

        this.setState({error: true});
      });
  }

  handleViewSwitch (type) {
    this.setState({panel: type});
  }

  render () {
    const {displayModal, match, modelType} = this.props;
    const {params} = match;
    const {scid} = params;
    const {error, panel, reports, scid: scidData, tickets} = this.state;
    const events = 73;
    const inPass = scid === 'OW0002';
    const openTickets = _.get(tickets, 'issues', []);

    const locationLP = 'Svalbard, Norway';
    const timeLP = '12h 04m 18s';
    const locationNP = 'Inuvik, Canada';
    const timeNP = '00h 58m 52s';

    // console.log('Satellite this.props');
    // console.log(this.props);
    // console.log('Satellite this.state');
    // console.log(this.state);

    return (
      <div>
        { displayModal
          && modelType === MODAL_TELEM
          && <TelemetryWrap><Telemetry/></TelemetryWrap>
        }
        { error && (
          <div>
            <p>There was an error fetching data for {scid}.</p>
          </div>
        ) }
        { inPass && (
          <NotificationBar
            color='green'
            svg='satellite'
            title={`Satellite ${scid} is in pass with LOCATION, LOCATION for 12m 52s`}
          />
        ) }
        <Banner>
          <Tab
            onClick={_.partial(this.handleViewSwitch, PASS_ACTIVITY)}
            selected={panel === PASS_ACTIVITY}
          >Pass Activity</Tab>
          <Tab
            onClick={_.partial(this.handleViewSwitch, VEHICLE_DETAILS)}
            selected={panel === VEHICLE_DETAILS}
          >Vehicle Details</Tab>
          <Actions/>
        </Banner>
        <LeftCol>
          <PassInformation
            locationLP={locationLP}
            locationNP={locationNP}
            scid={scid}
            scidData={scidData}
            timeLP={timeLP}
            timeNP={timeNP}
            type={panel}
          />
        </LeftCol>
        <RightCol>
          <InfoColumn
            color='orange'
            number={reports.length}
            svg='anomalyReports'
            title='Anomaly Reports'
            width={33}
          />
          <InfoColumn
            color='purple'
            number={openTickets.length}
            svg='openTickets'
            title='Open Tickets'
            width={33}
          />
          <InfoColumn
            color='blue'
            number={events}
            svg='events'
            title='Events'
            width={33}
          />
          <TabTable
            reports={reports}
            tickets={openTickets}
          />
        </RightCol>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {AppStore} = state;
  const {displayModal, modelType} = AppStore;

  return {displayModal, modelType};
};

const ConnectedSatellite = connect(mapStateToProps)(Satellite);

export default withRouter(ConnectedSatellite);
