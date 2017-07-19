import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import StatusBar from '../core/StatusBar';
import Check from '../core/Svgs/Check';
import Dots from '../core/Svgs/Dots';
import Table from '../core/Table';
import {$GreyLight, $SecondaryColor} from '../core/Variables';
import {openModal} from '../../redux/App';
import {MODAL_ANOMREPORT} from '../../utilities/constants';

const Div = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  width: 100%;
  margin-right: 1%;
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
    fill: ${$SecondaryColor};
    height: 25px;
    width: 25px;
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

const StatusChecksTable = props => {
  const {handleModalOpen, reports, totalNumber} = props;

  // eslint-disable-next-line react/no-multi-comp
  const rowRender = (rowData, index) => {
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

  return (
    <Div>
      <Header>
        <Check/>
        <Label>Checkpoints ({totalNumber})</Label>
      </Header>
      <TableWrap>
        <Table
          headers={[
            //{label: ''},
            {label: 'Name', key: 'title'},
            {label: 'Description'},
            {label: 'Date', key: 'timeCreated'},
            {label: 'Status', key: 'status'},
            {label: ''}
          ]}
          rowData={reports}
          rowRender={rowRender}
        />
      </TableWrap>
    </Div>
  );
};

StatusChecksTable.propTypes = {
  handleModalOpen: PropTypes.func,
  reports: PropTypes.arrayOf(PropTypes.object),
  totalNumber: PropTypes.number
};

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: type => {
      dispatch(openModal(type));
    }
  };
};

const ConnectedStatusChecksTable = connect(null, mapDispatchToProps)(StatusChecksTable);

export default ConnectedStatusChecksTable;
