import React from 'react'; 
import Dots from './Svgs/Dots';
import styled from 'styled-components';
import {$GreyLight} from './Variables';

const Button = styled.button`
  text-align: center;
  height: 35px;
  width: 100%;

  svg {
    height: 25px;
    width: 35px;
    fill: #888787;
  }
`;

class EditDots extends React.Component {
  constructor(props) { 
  	super(props); 
  	this.handleClick = this.handleClick.bind(this); 
	}
  
  handleClick(){
    const person = prompt("Setting:", this.props.name);
    this.props.onChange(person);
  }
  
  render() { 
    return ( 
      <div>
        <Button onClick={this.handleClick}> 
          <Dots/>
        </Button> 
      </div>
    ); 
  } 
}

export default EditDots;