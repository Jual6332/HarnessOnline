import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import StatusBar from '../core/StatusBar';
import Dots from '../core/Svgs/Dots';
import Table from '../core/Table';
import {$SecondaryColor} from '../core/Variables';

const Div = styled.div`
  text-align: left;
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

const TR = styled.tr`
  ${props => props.selected && `
    background: ${$SecondaryColor};
    color: white;
  ` }
`;

const Reports = props => {
  const {handleSelect, reports, selectedId} = props;

  // eslint-disable-next-line react/no-multi-comp
  const rowRender = (rowData, index) => {
    const time = rowData.timeCreated
      && moment(rowData.timeCreated).format('MM/DD/YYYY, HH:mm:ss');

    return (
      <TR
        key={index}
        onClick={_.partial(handleSelect, rowData._id)}
        selected={selectedId === rowData._id}
      >
        <td><StatusBar status={rowData.status}/></td>
        <td>{rowData.title}</td>
        <td>{rowData.systemsAffected && rowData.systemsAffected.join(', ')}</td>
        <td>{time}</td>
        <td>{rowData.status}</td>
        <td><Dots/></td>
      </TR>
    );
  };

  return (
    <Div>
      <TableWrap>
        <Table
          headers={[
            {label: ''},
            {label: 'Anomaly', key: 'title'},
            {label: 'Vehicle'},
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

Reports.propTypes = {
  handleSelect: PropTypes.func,
  reports: PropTypes.arrayOf(PropTypes.object),
  selectedId: PropTypes.string
};

export default Reports;
