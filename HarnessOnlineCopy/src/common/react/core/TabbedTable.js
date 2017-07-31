import React from 'react';

import styled from 'styled-components';
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
`;

const TabContent = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-top: none;
  font-size: 18px;
  font-weight; 500;

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
  render: function() {
    return (
      <div>
        <Tab>
          <TabButton onClick={this.onClickOverview}>Overview</TabButton>
          <TabButton onClick={this.onClickCS}>Contact Scheduling Checkpoints</TabButton>
          <TabButton onClick={this.onClickOverview}>Spacecraft Checkpoints</TabButton>
        </Tab>
        { this.state.showResultsOverview ? <OverviewResults/> : null}
        { this.state.showResultsCS ? <CSResults/> : null}
      </div>
    );
  }
});

var OverviewResults = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h3>Visibilities Requested</h3>
        <p>Current Status ... </p>
        <h3>Contact Scheduling</h3>
        <p>Current Status ... </p>
        <h3>Spacecraft Scheduling</h3>
        <p>Current Status ... </p>
      </TabContent>
    );
  }
});

var CSResults = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h3>Contact Scheduling Checkpoints</h3>
      </TabContent>
    );
  }
});

export default TabbedTable;