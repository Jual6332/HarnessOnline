import React from 'react';
import ReactDOM from 'react-dom';
import Child from '../Home/Child';
import EditDots from '../core/EditDots';

class Parent extends React.Component{
	constructor(props) {
	    super(props);

	    this.state = { name: "Unavailability Processing" };
		this.changeName = this.changeName.bind(this);
	}
  
	changeName(newName) {
    	this.setState({
      	name: newName
    	});
  	}

  	render() {
    	return (
    	  <div>
    		<Child name={this.state.name} onChange={this.changeName} />
    		<EditDots onChange={this.changeName} />
    	  </div>
    	);
  	}
}

export default Parent;