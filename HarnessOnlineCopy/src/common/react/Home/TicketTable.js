import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Dots from '../core/Svgs/Dots';
import Table from '../core/Table';
import Tags from '../core/Svgs/Tags';
import {$GreyLight, $SecondaryColor} from '../core/Variables';
import {openModal} from '../../redux/App';
import {MODAL_TICKET} from '../../utilities/constants';

const Div = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  width: 49%;
  margin-left: 1%;
  margin-bottom: 15px;
  border: 2px solid ${$GreyLight};
  text-align: left;
`;

const Header = styled.div`
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 2px solid ${$SecondaryColor};

  svg {
    vertical-align: top;
    margin-right: 5px;
    height: 25px;
    width: 25px;
    fill: ${$SecondaryColor};
  }
`;

const Label = styled.p`
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  color: ${$SecondaryColor};
  text-transform: uppercase;
`;

const Links = styled.div`
  float: right;

  p {
    display: inline-block;
    margin-left: 15px;
    color: ${$GreyLight};
    cursor: pointer;

    &:last-of-type {
      margin-left: none;
    }
  }
`;

const TableWrap = styled.div`
  text-align: left;

  th {
    &:nth-of-type(2) {
      width: 60px;
    }

    &:nth-of-type(3) {
      width: 170px;
    }

    &:nth-of-type(4) {
      width: 40px;
      text-align: center;
    }

    &:nth-of-type(5) {
      width: 30px;
    }
  }

  td {
    &:nth-of-type(4) {
      text-align: center;
    }

    &:nth-of-type(5) {
      text-align: center;

      svg {
        height: 25px;
        width: 25px;
        fill: #888787;
      }
    }
  }
`;

const TicketTable = props => {
  const {handleModalOpen, tickets, totalNumber} = props;

  // eslint-disable-next-line react/no-multi-comp
  const rowRender = (rowData, index) => {
    const time = rowData.event_time
      && moment(rowData.event_time).format('MM/DD/YYYY, HH:mm:ss');

    return (
      <tr key={index}>
        <td>{rowData.logmessage}</td>
        <td>{rowData.spacecraft}</td>
        <td>{time}</td>
        <td>{rowData.severity}</td>
        <td><Dots/></td>
      </tr>
    );
  };

  return (
    <Div>
      <Header>
        <Tags/>
        <Label>Top Open Tickets ({totalNumber})</Label>
        <Links>
          <p onClick={_.partial(handleModalOpen, MODAL_TICKET)}>Create Ticket</p>
          <Link to='/'><p>View All</p></Link>
        </Links>
      </Header>
      <TableWrap>
        <Table
          headers={[
            {label: 'Description', key: 'logmessage'},
            {label: 'Vehicle', key: 'spacecraft'},
            {label: 'Date', key: 'event_time'},
            {label: 'Severity', key: 'severity'},
            {label: ''}
          ]}
          rowData={tickets}
          rowRender={rowRender}
        />
      </TableWrap>
    </Div>
  );
};

TicketTable.propTypes = {
  handleModalOpen: PropTypes.func,
  tickets: PropTypes.arrayOf(PropTypes.object),
  totalNumber: PropTypes.number
};

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: type => {
      dispatch(openModal(type));
    }
  };
};

const ConnectedTicketTable = connect(null, mapDispatchToProps)(TicketTable);

export default ConnectedTicketTable;
