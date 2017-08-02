import React from 'react';

import styled from 'styled-components';
import {$GreenDark, $WarningYellow} from './Variables';
import HarnessStatusBar from '../Home/HarnessStatusBar';

const ButtonStart = styled.button`
  padding: 20px
  text-align: center;
  width: 7.5%;
  margin-bottom: 25px;
  font-size: 20px;
`;

const ButtonStop = styled.button`
  background-color: ${$WarningYellow};
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
      harnessRunning: true,
      message: this.props.title
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    if (!this.props.check){
      alert("Harness is running!");
      this.setState({harnessRunning: true, message: "Stop Harness"}) 

      fetch('http://172.31.224.143:45000/Initiate', {
        method: 'POST',
        body: "Start Planning"
      })
        .then(response => {
          console.log('response');
          console.log(response);
        })
        .catch(error => {
          console.log('err')
          console.log(error)
      });

        const displayBanner = <HarnessStatusBar check={this.state.harnessRunning} status={this.state.harnessRunning ? "Harness is Running": "Harness is Stopped"}/>;
    
    }else{
      alert("Harness is stopped!");
      this.setState({harnessRunning: false, message: "Start Harness"}) 
    }
  }

  render() {
    let displayBanner = <HarnessStatusBar check={this.state.harnessRunning} status={this.state.harnessRunning ? "Harness is Running": "Harness is Stopped"}/>;
    let decision = this.props.check;
    if(decision){
      return (
        <div>
          {displayBanner}
          <ButtonStart title={this.state.message} onClick={this.handleClick}>
            {this.state.message}
          </ButtonStart>
        </div>
      );
    }else{
      return (
        <div>
          {displayBanner}
          <ButtonStop title={this.state.message} onClick={this.handleClick}>
            {this.state.message}
          </ButtonStop>
        </div>
      );
    }
  }
}

export default Toggle;