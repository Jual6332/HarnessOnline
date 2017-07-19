import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Alert from '../core/Svgs/Alert';
import {$SecondaryColorLight} from '../core/Variables';
import {openModal} from '../../redux/App';
import {MODAL_ANOMREPORT} from '../../utilities/constants';

const Div = styled.div`
  display: inline-block;
  margin-top: -10px;
  margin-right: 20px;
  float: right;
`;

const Action = styled.div`
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
      <Action onClick={_.partial(handleModalOpen, MODAL_ANOMREPORT)}>
        <Alert/>
        <p>Create Anomaly Report</p>
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
