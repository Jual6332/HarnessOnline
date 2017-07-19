import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Alert from '../core/Svgs/Alert';
import Gauge from '../core/Svgs/Gauge';
import Tags from '../core/Svgs/Tags';
import {$SecondaryColorLight} from '../core/Variables';
import {openModal} from '../../redux/App';
import {
  MODAL_ANOMREPORT,
  MODAL_TELEM,
  MODAL_TICKET
} from '../../utilities/constants';

const Div = styled.div`
  display: inline-block;
  margin-right: 20px;
  float: right;
`;

const Action = styled.div`
  margin: 10px 20px;
  display: inline-block;
  cursor: pointer;
  color: ${$SecondaryColorLight};

  svg {
    height: 25px;
    width: 25px;
    fill: ${$SecondaryColorLight};
  }

  p {
    display: inline-block;
    vertical-align: super;
  }
`;

const Actions = props => {
  const {handleModalOpen} = props;

  return (
    <Div>
      <Action onClick={_.partial(handleModalOpen, MODAL_TELEM)}>
        <Gauge/>
        <p>Telemetry Snapshot</p>
      </Action>
      <Action onClick={_.partial(handleModalOpen, MODAL_ANOMREPORT)}>
        <Alert/>
        <p>Create Anomaly Reports</p>
      </Action>
      <Action onClick={_.partial(handleModalOpen, MODAL_TICKET)}>
        <Tags/>
        <p>Create Ticket</p>
      </Action>
    </Div>
  );
};

Actions.propTypes = {
  handleModalOpen: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: type => {
      dispatch(openModal(type));
    }
  };
};

const ConnectedActions = connect(null, mapDispatchToProps)(Actions);

export default ConnectedActions;
