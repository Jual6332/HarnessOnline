import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components';

import Actions from './Actions';
import Filter from './Filter';
import Pagination from './Pagination';
import Issue from './Issue';
import Issues from './Issues';
import {$SecondaryColor} from '../core/Variables';
import config from '../../config/config';
import {get} from '../../utilities/fetch';
import logger from '../../utilities/logger';
import {bindMethods} from '../../utilities/reactHelpers';

const conf = config();
const {endpoints} = conf;
const {linkerd, ticketer: ticketerEP} = endpoints;

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
      tickets: [],
      selectedTicketId: ''
    };

    this.endpoints = [
      {
        ...linkerd,
        path: [
          ticketerEP.linkerdId, ...ticketerEP.issuesPath
        ],
        query: {
          resolution: 'Unresolved'
        },
        dataLocation: 'tickets'
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
    this.setState({selectedTicketId: id});
  }

  render () {
    const {filter, tickets, selectedTicketId} = this.state;
    const {date, page, terms, type} = filter;
    const issues = _.get(tickets, 'issues', []);
    const selectedReport = _.find(issues, ['id', selectedTicketId]) || {};

    // console.log('Tickets this.props');
    // console.log(this.props);
    // console.log('Tickets this.state');
    // console.log(this.state);

    return (
      <Div>
        <LeftColumn>
          <Header>
            <p>Filter Reports</p>
          </Header>
          <Filter
            date={date}
            handleFilter={this.handleFilter}
            terms={terms}
            type={type}
          />
        </LeftColumn>
        <CenterColumn>
          <Header>
            <p>Tickets ({issues.length})</p>
            <Actions/>
            <span/>
          </Header>
          <Issues
            handleSelect={this.handleSelect}
            issues={issues}
            selectedId={selectedTicketId}
          />
          <Pagination
            currentPage={page}
            handleClick={this.handleFilter}
            totalPages={1}
          />
        </CenterColumn>
        <RightColumn>
          <Header>
            <p>Report Details</p>
          </Header>
          <Issue {...selectedReport} ticketKey={selectedReport.key}/>
        </RightColumn>
      </Div>
    );
  }
}

export default AnomReports;
