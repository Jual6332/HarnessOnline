import React from 'react'; 
import Dots from './Svgs/Dots';
import styled from 'styled-components';
import {$GreyLight} from './Variables';
import ProgressBarChild from './ProgressBarChild';

class OverviewProgressBar extends React.Component {
  constructor(props) { 
  	super(props); 

  	this.state = { width: this.props.startValue };
  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue){
  	this.setState({
    	width: newValue
  	});
  }
  
  render() { 
    return ( 
	  <ProgressBarChild tabindex={this.props.tabindex} currentValue={this.state.width} onChange={this.handleChange}/>
    ); 
  } 
}

export default OverviewProgressBar;