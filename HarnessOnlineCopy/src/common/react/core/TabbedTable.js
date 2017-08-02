import React from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';
import Alert from '../core/Svgs/Alert';
import OverviewProgressBar from '../core/OverviewProgressBar';
import {$GreenDark, $SecondaryColor, $WarningYellow} from './Variables';

const Tab = styled.div`
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  padding: 10px;
`;

const TabButton = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: ${$SecondaryColor};
  display: inline-block;

  background-color: #f1f1f1;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;

  &:hover {
    background-color: #ddd;
  }

  active {
    background-color: #ddd;
  }
`;

const TabContent = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-top: none;
  font-size: 18px;
  font-weight; 500;
  overflow: hidden;

  -webkit-animation: fadeEffect 1s;
  animation: fadeEffect 1s;

  @-webkit-keyframes fadeEffect {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes fadeEffect {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  svg {
    vertical-align: top;
    margin-right: 5px;
    fill: ${$SecondaryColor};
    height: 25px;
    width: 25px;
  }
`;

const TabbedTable = React.createClass({
  getInitialState: function(){
    return { 
      showResultsOverview: false,
      showResultsCS: false,
      showResultsSC: false
    };
  },
  onClickOverview: function(){
    this.setState({ showResultsOverview: true, showResultsCS: false, showResultsSC: false });
  },
  onClickCS: function(){
    this.setState({ showResultsOverview: false, showResultsCS: true, showResultsSC: false });
  },
  onClickSC: function(){
    this.setState({ showResultsOverview: false, showResultsCS: false, showResultsSC: true });
  },
  render: function() {
    return (
      <div>
        <Tab>
          <TabButton onClick={this.onClickOverview}>Overview</TabButton>
          <TabButton onClick={this.onClickCS}>Contact Scheduling Checkpoints</TabButton>
          <TabButton onClick={this.onClickSC}>Spacecraft Scheduling Checkpoints</TabButton>
        </Tab>
        { this.state.showResultsOverview ? <OverviewResults/> : null }
        { this.state.showResultsCS ? <CSResults/> : null }
        { this.state.showResultsSC ? <SCResults/> : null }
      </div>
    );
  }
});

var OverviewResults = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h2>Overview Scheduling Checkpoints</h2>
        <p>Visibilities Requested: Checking Status ...</p>
        <p>Contact Scheduling: Checking Status ...</p>
        <p>Spacecraft Scheduling: Checking Status ...</p>
        <OverviewProgressBar tabindex={0} startValue={30} />
      </TabContent>
    );
  }
});

var CSResults = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h3>Contact Scheduling Checkpoints</h3>
        <OverviewProgressBar tabindex={1} startValue={12.5} />
      </TabContent>
    );
  }
});

var SCResults = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h3>Spacecraft Scheduling Checkpoints</h3>
        <OverviewProgressBar tabindex={2} startValue={20} />
      </TabContent>
    );
  }
});

export default TabbedTable;