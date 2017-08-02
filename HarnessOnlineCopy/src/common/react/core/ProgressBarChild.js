import React from 'react'; 
import Dots from './Svgs/Dots';
import styled from 'styled-components';
import {$GreyLight} from './Variables';

const MyProgress = styled.div`
  width: 100%;
  background-color: grey;
`;

const MyBar = styled.div`
  width: 30%;

  ${props => props.width && `width: ${props.width}%;`}

  ${props  => {
    console.log(props);
  }}

  height: 30px;
  background-color: #4CAF50;
  text-align: center; 
  line-height: 30px; 
  color: white; 

  h2 {
    color: white;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  text-align: center;
  height: 35px;
  width: 10%;
  float: left;

  svg {
    height: 25px;
    width: 35px;
    fill: #888787;
  }
`;

class ProgressBarChild extends React.Component {
  constructor(props) { 
  	super(props); 
  	this.onClick = this.onClick.bind(this); 
	}
  
  onClick(){
    this.props.onChange(this.props.currentValue+35);
  }
  
  render() { 
    return ( 
      <div>
        <MyProgress>
          <MyBar width={this.props.currentValue}>{this.props.currentValue}</MyBar>
          <Button onClick={this.onClick}>Update Progress Bar</Button>
        </MyProgress>
      </div>
    ); 
  } 
}

export default ProgressBarChild;