import React from 'react';
import styled from 'styled-components';
import {$GreyLight} from './Variables';

const NewProgress = styled.div`
  border: 2px;
  width: 100%;
  max-width: 800px;
  margin: 30px auto 0;
  display: table;
  position: relative;
  text-align: center;
  left: 4%;
`;

class CheckpointingLoaderChild extends React.Component{
  constructor(props) { 
  	super(props); 
  }

  render() { 
    return ( 
	  <NewProgress></NewProgress>
    ); 
  }
}

export default CheckpointingLoaderChild;