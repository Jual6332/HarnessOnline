import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

import MenuDown from '../core/Svgs/MenuDown';
import {bindMethods} from '../../utilities/reactHelpers';
import sortUtil from '../../utilities/sort';

const MenuDownWrap = styled.div`
  display: inline-block;
  vertical-align: middle;

  svg {
    height: 25px;
    width: 25px;
    fill: #CCC;
  }
`;

const ScTable = styled.table`
  width: 100%;
  border-spacing: 0px;

  thead {
    tr {
      height: 25px;
    }

    th {
      cursor: pointer;
    }
  }

  tbody {
    svg {
      height: 25px;
      width: 25px;
    }

    tr {
      height: 35px;

      &:nth-child(odd) {
        background-color: #EFEFEF;
      }
    }
  }

  td {
    vertical-align: middle;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object),
    rowData: PropTypes.arrayOf(PropTypes.object),
    rowRender: PropTypes.func
  };

  constructor (props) {
    super(props);

    this.state = {
      rowData: props.rowData,
      sortOrder: '',
      sortRow: ''
    };

    bindMethods(this, [
      'sortRow'
    ]);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.rowData) {
      this.setState({rowData: nextProps.rowData});
    }
  }

  sortRow (field, ascDesc) {
    const sortedArray = sortUtil(
      this.state.rowData,
      {key: field, reverse: ascDesc === 'asc'}
    );

    this.setState({
      rowData: sortedArray,
      sortOrder: ascDesc,
      sortRow: field
    });
  }

  render () {
    const {headers, rowRender} = this.props;
    const {rowData, sortOrder, sortRow} = this.state;

    return (
      <ScTable>
        { headers && (
          <thead>
            <tr>
              { headers.map((header, index) => {
                return header.label ?
                  <th
                    key={index}
                    onClick={header.key && _.partial(this.sortRow, header.key)}
                  >{header.label}<MenuDownWrap><MenuDown/></MenuDownWrap></th>
                  : <th key={index}/>;
              }) }
            </tr>
          </thead>
        ) }
        { rowRender && (
          <tbody>
            { rowData && rowData.map((data, index) => {
              return rowRender(data, index);
            }) }
          </tbody>
        ) }
      </ScTable>
    );
  }
}

export default Table;
