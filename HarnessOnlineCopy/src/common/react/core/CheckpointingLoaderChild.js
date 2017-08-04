import React from 'react';
import styled from 'styled-components';
import {$GreyLight} from './Variables';

const Progress = styled.div`
  border: 2px;
  width: 100%;
  max-width: 800px;
  margin: 30px auto 0;
  display: table;
  position: relative;
  text-align: center;
  left: 4%;
`;

const ListItem = styled.li`
  background-color: #0e90d2;
  display: table-cell;
  position: relative;
  line-height: 20px;
  z-index: -3;
  color: #FFF;
  text-align: left;
  transition: background-color 0.75s, color 0.5s;
  border: solid 5px #0e90d2;
`;

class CheckpointingLoaderChild extends React.Component{
  constructor(props) { 
  	super(props); 
  }

  render() { 
    return ( 
	  <Progress>
	  	<ul>
		  	<ListItem>1</ListItem>
		  	<ListItem>2</ListItem>
		  	<ListItem>3</ListItem>
		</ul>
	  </Progress>
    ); 
  }
}

export default CheckpointingLoaderChild;