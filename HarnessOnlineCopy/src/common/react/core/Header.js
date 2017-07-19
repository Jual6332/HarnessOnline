import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Logo from './Svgs/Logo';
import {$PrimaryColor, $SecondaryColor} from './Variables';
import {openModal} from '../../redux/App';
import {MODAL_ANOMREPORT, MODAL_TICKET} from '../../utilities/constants';

const LogoLink = styled(Link)`
  float: left;
  display: inline-block;
  width: 100px;
  padding-top: 15px;
`;

const Nav = styled.nav`
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  align-items: center;

  p {
    display: inline-block;
    padding: 20px 15px 15px 15px;
    color: ${$SecondaryColor};
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: ${$PrimaryColor};
    }
  }
`;

const ScLink = styled(Link)`
  display: inline-block;
  padding: 15px;
  color: ${$SecondaryColor};
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    color: ${$PrimaryColor};
  }

  ${props => props.to.state.currentPage && `
      border-top: 4px solid ${$PrimaryColor};
      color: ${$PrimaryColor};
  ` }
`;

const Header = props => {
  const {location, handleModalOpen} = props;

  return (
    <div>
      <Nav>
        <LogoLink to='/'>
          <Logo/>
        </LogoLink>
        <ScLink
          to={{
            pathname: '/',
            state: {currentPage: location.pathname === '/'}
          }}
        >Home</ScLink>
        <ScLink
          to={{
            pathname: '/settings',
            state: {currentPage: location.pathname === '/settings'}
          }}
        >Configuration Settings</ScLink>
        <ScLink
          to={{
            pathname: '/logs',
            state: {currentPage: location.pathname === '/logs'}
          }}
        >View Logs</ScLink>
      </Nav>
      <SearchBar/>
    </div>
  );
};

Header.propTypes = {
  handleModalOpen: PropTypes.func,
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: type => {
      dispatch(openModal(type));
    }
  };
};

const ConnectedHeader = connect(null, mapDispatchToProps)(Header);

export default withRouter(ConnectedHeader);
