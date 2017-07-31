import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

import StatusChecksTable from './StatusChecksTable';
import HarnessStatusBar from './HarnessStatusBar';
import ConfigSettingsTable from '../Home/ConfigSettingsTable';
import {$HarnessConfigSettings} from '../core/HarnessConfigSettings';
import NotificationBar from '../core/NotificationBar';

import TabbedTable from '../core/TabbedTable';
import Toggle from '../core/Toggle';
import CheckCircle from '../core/Svgs/CheckCircle';
import config from '../../config/config';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {$GreenDark, $WarningYellow} from '../core/Variables';
import Parent from '../Home/Parent';

const conf = config();
const {endpoints} = conf;
const {
  anomalyReport: anomalyReportEP, linkerd, ticketer: ticketerEP
} = endpoints;

const Div = styled.div`
  padding: 10px;
  text-align: center;
  margin-right: 1%;
  width: 99%;
`;

const ChecksBar = styled.div`
  svg {
    vertical-align: top;
    margin-right: 55px;
    fill: ${$GreenDark};
    height: 35px;
    width: 35px;
  }
`;

const TableContainer = styled.div`
  padding: 10px;
`;

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      reports: [],
      resolvedTickets: [],
      unresolvedTickets: [],
      settings: $HarnessConfigSettings
    };

    this.endpoints = [
      {
        ...linkerd,
        path: [
          anomalyReportEP.linkerdId, ...anomalyReportEP.reportsPath
        ],
        dataLocation: 'reports'
      },
      {
        ...linkerd,
        path: [
          ticketerEP.linkerdId, ...ticketerEP.issuesPath
        ],
        query: {
          resolution: 'Unresolved'
        },
        dataLocation: 'unresolvedTickets'
      },
      {
        ...linkerd,
        path: [
          ticketerEP.linkerdId, ...ticketerEP.issuesPath
        ],
        query: {
          resolution: 'Resolved'
        },
        dataLocation: 'resolvedTickets'
      }
    ];
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

  render () {
    const {reports, resolvedTickets, unresolvedTickets, settings, name} = this.state;
    const unResTickets = _.get(unresolvedTickets, 'issues', []);
    const resTickets = _.get(resolvedTickets, 'issues', []);

    const harnessRunning = false;
    const displayBanner = <HarnessStatusBar check={harnessRunning} status={harnessRunning ? "Harness is Running": "Harness is Stopped"}/>;
    const displayButton = <Toggle check={harnessRunning} title={harnessRunning ? "Stop Harness": "Start Harness"}/>;
    const displayTable = <ConfigSettingsTable reports={settings.slice(0, 14)} totalNumber={settings.length} />;

    const displayDropDown = <Parent/>;
    const displayStatusChecks = <StatusChecksTable reports={reports.slice(0, 14)} totalNumber={reports.length}/>;

    return (
      <div>
        <Div>
          {displayBanner}
        </Div>

        <Div>
          <TabbedTable/>
        </Div>

        <Div>
          {displayTable}
          {displayButton}
        </Div>
      </div>
    );
  }
}

export default Home;
