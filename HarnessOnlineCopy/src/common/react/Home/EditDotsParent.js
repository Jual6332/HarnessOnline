import React from 'react';
import ReactDOM from 'react-dom';
import EditDots from '../core/EditDots';

class EditDotsParent extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = { name: this.props.setting };
		this.changeName = this.changeName.bind(this);
	}
  
	changeName(newName) {
  	this.setState({
    	name: newName
  	});
    this.props.updateSettings(this.props.index, newName);
  }

	render() {
  	return (
  	  <div>
  		  <EditDots name={this.state.name} onChange={this.changeName} />
  	  </div>
  	);
	}
}

export default EditDotsParent;