import React from 'react';

import CheckpointingLoaderChild from './CheckpointingLoaderChild';
import styled from 'styled-components';
import {$GreyLight} from './Variables';

class CheckpointingLoaderParent extends React.Component{
  constructor(props) { 
  	super(props); 

  	this.state = { width: 0 };
  }
  
  render() { 
    return ( 
	  <CheckpointingLoaderChild/>
    ); 
  }
}

export default CheckpointingLoaderParent;