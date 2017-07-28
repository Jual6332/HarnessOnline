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
    return { showResults: false };
  },
  onClick: function(){
    this.setState({ showResults: true });
  },
  render: function() {
    return (
      <div>
        <Tab>
          <TabButton onClick={this.onClick}>London</TabButton>
          <TabButton onClick={this.onClick}>Paris</TabButton>
          <TabButton onClick={this.onClick}>Tokyo</TabButton>
        </Tab>
        { this.state.showResults ? <Results/> : null}
      </div>
    );
  }
});

var Results = React.createClass({
  render: function(){
    return(
      <TabContent>
        <h3>London</h3>
        <p>London is the capital city of England.</p>
      </TabContent>
    );
  }
});

export default TabbedTable;