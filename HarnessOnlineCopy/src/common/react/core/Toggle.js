import React from 'react';

import styled from 'styled-components';
import {$GreenDark, $WarningYellow} from './Variables';

const ButtonStart = styled.button`
  background: ${$GreenDark}
  padding: 20px;
  text-align: center;
  width: 7.5%;
  margin-bottom: 25px;
  font-size: 20px;
`;

const ButtonStop = styled.button`
  background: ${$WarningYellow}
  padding: 20px;
  text-align: center;
  width: 7.5%;
  margin-bottom: 25px;
  font-size: 20px;
`;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    let decision = this.props.check;
    if(decision){
      return (
        <ButtonStart title={this.props.title} onClick={this.handleClick}>
          {this.props.title}
        </ButtonStart>
      );
    }else{
      return (
        <ButtonStop title={this.props.title} onClick={this.handleClick}>
          {this.props.title}
        </ButtonStop>
      );
    }
  }
}

export default Toggle;