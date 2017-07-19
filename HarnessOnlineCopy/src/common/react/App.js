/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import styled, {injectGlobal} from 'styled-components';

import {ReactRoutes} from './routes';
import AnomReportForm from './core/AnomReportForm';
import Header from './core/Header';
import Modal from './core/Modal';
import TicketForm from './core/TicketForm';
import clientUrl from '../utilities/clientUrl';
import {MODAL_ANOMREPORT, MODAL_TICKET} from '../utilities/constants';
import favicon from '../../assets/favicon.png';

injectGlobal`
  * {
    vertical-align: baseline;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-style: inherit;
    font-size: 100%;
  }

  *:focus {
    outline: none;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const Div = styled.div`
  width: 100%;
`;

const App = props => {
  const {displayModal, location, modelType} = props;
  const ModelForm = {
    [MODAL_ANOMREPORT]: <AnomReportForm/>,
    [MODAL_TICKET]: <TicketForm/>
  }[modelType] || null;

  return (
    <div>
      <Helmet>
        <title>MPH Online</title>
        <link rel='icon' type='image/x-icon' href={`${clientUrl()}${favicon}`}/>
      </Helmet>
      <Header/>
      <Div>
        {displayModal && <Modal>{ModelForm}</Modal>}
        <ReactRoutes location={location}/>
      </Div>
    </div>
  );
};

App.propTypes = {
  displayModal: PropTypes.bool,
  location: PropTypes.object,
  modelType: PropTypes.string
};

const mapStateToProps = state => {
  const {AppStore} = state;
  const {displayModal, modelType} = AppStore;

  return {displayModal, modelType};
};

const ConnectedApp = connect(mapStateToProps)(App);

export default withRouter(ConnectedApp);
