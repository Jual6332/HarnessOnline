import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Check from '../core/Svgs/Check';
import Dots from '../core/Svgs/Dots';
import EditDotsParent from './EditDotsParent';
import StatusBar from '../core/StatusBar';
import Table from '../core/Table';
import {$GreyLight, $SecondaryColor} from '../core/Variables';
import {openModal} from '../../redux/App';
import {MODAL_ANOMREPORT} from '../../utilities/constants';

const Div = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 5px;
  width: 95%;
  margin-right: 1%;
  margin-bottom: 15px;
  border: 2px solid ${$GreyLight};
  text-align: left;
  float: left;
`;

const Div2 = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding-top: 15px;
  width: 3%;
  margin-right: 1%;
  margin-bottom: 15px;
  text-align: left;
  float: right;
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

const Spacing = styled.div`
  height: 29px;
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

const ConfigSettingsTable = props => {
  const {handleModalOpen, reports, totalNumber, updateSettings} = props;

  // eslint-disable-next-line react/no-multi-comp
  const rowRender = (rowData, index) => {
    return (
      <div>
        <tr key={index}>
          <td>{rowData.title}</td>
          <td>{rowData.description}</td>
          <td>{rowData.value}</td>
          <td>{rowData.units}</td>
        </tr>
      </div>
    );
  };

  return (
    <div>
      <Div>
        <Header>
          <Check/>
          <Label>Configuration Settings ({totalNumber})</Label>
        </Header>
        <TableWrap>
          <Table
            headers={[
              {label: 'Name', key: 'title'},
              {label: 'Description'},
              {label: 'Value', key: 'timeCreated'},
              {label: 'Units', key: 'status'},
              {label: ''}
            ]}
            rowData={reports}
            rowRender={rowRender}
          />
        </TableWrap>
      </Div>
      <Div2>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <EditDotsParent updateSettings={updateSettings} index={0} setting={reports[0].value}/>
        <EditDotsParent setting={reports[1].value}/>
        <EditDotsParent setting={reports[2].value}/>
        <EditDotsParent setting={reports[3].value}/>
        <EditDotsParent setting={reports[4].value}/>
        <EditDotsParent setting={reports[5].value}/>
        <EditDotsParent setting={reports[6].value}/>
        <EditDotsParent setting={reports[7].value}/>
      </Div2>
    </div>
  );
};

ConfigSettingsTable.propTypes = {
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

const ConnectedConfigSettingsTable = connect(null, mapDispatchToProps)(ConfigSettingsTable);

export default ConnectedConfigSettingsTable;
