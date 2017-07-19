import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

const Issues = props => {
  const {handleSelect, issues, selectedId} = props;

  // eslint-disable-next-line react/no-multi-comp
  const rowRender = (rowData, index) => {
    const time = rowData.timeCreated
      && moment(rowData.timeCreated).format('MM/DD/YYYY, HH:mm:ss');

    return (
      <TR
        key={index}
        onClick={_.partial(handleSelect, rowData.id)}
        selected={selectedId === rowData.id}
      >
        <td>{rowData.logmessage}</td>
        <td>{rowData.spacecraft}</td>
        <td>{time}</td>
        <td>{rowData.severity}</td>
        <td><Dots/></td>
      </TR>
    );
  };

  return (
    <Div>
      <TableWrap>
        <Table
          headers={[
            {label: 'Anomaly', key: 'title'},
            {label: 'Vehicle'},
            {label: 'Date', key: 'timeCreated'},
            {label: 'Status', key: 'status'},
            {label: ''}
          ]}
          rowData={issues}
          rowRender={rowRender}
        />
      </TableWrap>
    </Div>
  );
};

Issues.propTypes = {
  handleSelect: PropTypes.func,
  issues: PropTypes.arrayOf(PropTypes.object),
  selectedId: PropTypes.string
};

export default Issues;
