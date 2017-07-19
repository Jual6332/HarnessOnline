import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

import Dots from '../core/Svgs/Dots';
import StatusBar from '../core/StatusBar';
import Table from '../core/Table';
import {$SecondaryColor} from '../core/Variables';
import {bindMethods} from '../../utilities/reactHelpers';

const PANEL_ANOMREPORT = 'PANEL_ANOMREPORT';
const PANEL_EVENT = 'PANEL_EVENT';
const PANEL_TICKET = 'PANEL_TICKET';

const Div = styled.div`
  margin: 25px 10px 10px 10px;
`;

const PlainWrap = styled.div`
`;

const Tab = styled.p`
  display: inline-block;
  width: 33%;
  padding: 10px 15px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #CCC;
  border-bottom: none;
  font-size: 20px;
  color: ${$SecondaryColor};
  text-transform: uppercase;

  &:last-of-type {
    width: 34%;
  }

  ${props => {
    return !props.selected && `
      background: #CCC;
      border: none;
      border: 1px solid white;
      border-bottom: 1px solid #CCC;
      color: #555;
    `;
  }}
`;

const TableWrap = styled.div`
  padding: 10px;
  border: 1px solid #CCC;
  border-top: none;
`;

const TicketTableWrap = styled.div`
  text-align: left;

  th {
    &:nth-of-type(1) {
      width: 100px;
    }

    &:nth-of-type(3) {
      width: 60px;
    }

    &:nth-of-type(4) {
      width: 170px;
    }

    &:nth-of-type(5) {
      width: 40px;
      text-align: center;
    }

    &:nth-of-type(6) {
      width: 30px;
    }
  }

  td {
    &:nth-of-type(5) {
      text-align: center;
    }

    &:nth-of-type(6) {
      text-align: center;

      svg {
        height: 25px;
        width: 25px;
        fill: #888787;
      }
    }
  }
`;

const AnomTableWrap = styled.div`
  text-align: left;

  th {
    &:nth-of-type(3) {
      width: 90px;
    }

    &:nth-of-type(4) {
      width: 170px;
    }

    &:nth-of-type(5) {
      width: 40px;
      text-align: center;
    }

    &:nth-of-type(6) {
      width: 30px;
      text-align: center;
    }
  }

  td {
    &:nth-of-type(5)
      text-align: center;
    }

    &:nth-of-type(6) {
      text-align: center;

      svg {
        height: 25px;
        width: 25px;
        fill: #888787;
      }
    }
  }
`;

class TabTable extends Component {
  static propTypes = {
    displayModal: PropTypes.bool,
    match: PropTypes.object,
    modelType: PropTypes.string
  };

  constructor (props) {
    super(props);

    this.state = {
      panel: PANEL_ANOMREPORT
    };

    bindMethods(this, [
      'handleViewSwitch'
    ]);
  }

  handleViewSwitch (type) {
    this.setState({panel: type});
  }

  render () {
    const {reports, tickets} = this.props;
    const {panel} = this.state;
    let data = null;
    let headers = null;
    let rowRender = null;
    let SecondWrap = PlainWrap;

    // eslint-disable-next-line react/no-multi-comp
    const rowRenderAnom = (rowData, index) => {
      const time = rowData.timeCreated
        && moment(rowData.timeCreated).format('MM/DD/YYYY, HH:mm:ss');

      return (
        <tr key={index}>
          <td><StatusBar status={rowData.status}/></td>
          <td>{rowData.title}</td>
          <td>{rowData.systemsAffected && rowData.systemsAffected.join(', ')}</td>
          <td>{time}</td>
          <td>{rowData.status}</td>
          <td><Dots/></td>
        </tr>
      );
    };

    // eslint-disable-next-line react/no-multi-comp
    const rowRenderTicket = (rowData, index) => {
      const time = rowData.event_time
        && moment(rowData.event_time).format('MM/DD/YYYY, HH:mm:ss');

      return (
        <tr key={index}>
          <td>{rowData.description}</td>
          <td>{rowData.logmessage}</td>
          <td>{rowData.spacecraft}</td>
          <td>{time}</td>
          <td>{rowData.severity}</td>
          <td><Dots/></td>
        </tr>
      );
    };

    if (panel === PANEL_ANOMREPORT) {
      data = reports;
      headers = [
        {label: ''},
        {label: 'Anomaly', key: 'title'},
        {label: 'Vehicle'},
        {label: 'Date', key: 'timeCreated'},
        {label: 'Status', key: 'status'},
        {label: ''}
      ];
      rowRender = rowRenderAnom;
      SecondWrap = AnomTableWrap;
    }

    if (panel === PANEL_EVENT) {
      data = [{PANEL_EVENT}];
    }

    if (panel === PANEL_TICKET) {
      data = tickets;
      headers = [
        {label: 'Ticket', key: 'description'},
        {label: 'Description', key: 'logmessage'},
        {label: 'Vehicle', key: 'spacecraft'},
        {label: 'Date', key: 'event_time'},
        {label: 'Severity', key: 'severity'},
        {label: ''}
      ];
      rowRender = rowRenderTicket;
      SecondWrap = TicketTableWrap;
    }

    return (
      <Div>
        <div>
          <Tab
            onClick={_.partial(this.handleViewSwitch, PANEL_ANOMREPORT)}
            selected={panel === PANEL_ANOMREPORT}
          >Anomaly Reports</Tab>
          <Tab
            onClick={_.partial(this.handleViewSwitch, PANEL_TICKET)}
            selected={panel === PANEL_TICKET}
          >Open Tickets</Tab>
          <Tab
            onClick={_.partial(this.handleViewSwitch, PANEL_EVENT)}
            selected={panel === PANEL_EVENT}
          >Events</Tab>
        </div>
        <TableWrap>
          <SecondWrap>
            <Table
              headers={headers}
              rowData={data}
              rowRender={rowRender}
            />
          </SecondWrap>
        </TableWrap>
      </Div>
    );
  }
}

TabTable.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
  tickets: PropTypes.arrayOf(PropTypes.object)
};

export default TabTable;
