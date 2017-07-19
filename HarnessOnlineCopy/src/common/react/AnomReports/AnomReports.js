import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

import Actions from './Actions';
import ConfigSettingsTable from '../Home/ConfigSettingsTable';
import Filter from './Filter';
//import Pagination from './Pagination';
import Report from './Report';
import Reports from './Reports';
import {$SecondaryColor} from '../core/Variables';
import {$HarnessConfigSettings} from '../core/HarnessConfigSettings';
import config from '../../config/config';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {anomalyReport: anomalyReportEP, linkerd} = endpoints;

const Div = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  padding-bottom: 2px;
  border-bottom: 2px solid ${$SecondaryColor};
  color: ${$SecondaryColor};

  p {
    display: inline-block;
  }
`;

const LeftColumn = styled.div`
  display: inline-block;
  width: 25%;
  padding-right: 20px;
  box-sizing: border-box;
  vertical-align: top;
`;

const CenterColumn = styled.div`
  display: inline-block;
  width: 55%;
  padding-right: 20px;
  box-sizing: border-box;
  vertical-align: top;
`;

const RightColumn = styled.div`
  display: inline-block;
  width: 20%;
  vertical-align: top;
`;

class AnomReports extends Component {
  static propTypes = {
  };

  constructor (props) {
    super(props);

    this.state = {
      filter: {
        date: '',
        page: 1,
        terms: '',
        type: ''
      },
      reports: $HarnessConfigSettings,
      selectedReportId: ''
    };

    this.endpoints = [
      {
        ...linkerd,
        path: [
          anomalyReportEP.linkerdId, ...anomalyReportEP.reportsPath
        ],
        dataLocation: 'reports'
      }
    ];

    bindMethods(this, [
      'handleFilter',
      'handleSelect'
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

  handleFilter (value, key) {
    this.setState({filter: {
      ...this.state.filter,
      [key]: value
    }});
  }

  handleSelect (id) {
    this.setState({selectedReportId: id});
  }

  render () {
    const {filter, reports, selectedReportId} = this.state;
    const {date, page, terms, type} = filter;
    const selectedReport = _.find(reports, ['_id', selectedReportId]) || {};

    // console.log('AnomReports this.props');
    // console.log(this.props);
    // console.log('AnomReports this.state');
    // console.log(this.state);

    return (
      <div>
        <Div>
          <ConfigSettingsTable
            reports={reports.slice(0, 14)}
            totalNumber={reports.length}
          />
        </Div>
      </div>
    );
  }
}

export default AnomReports;
