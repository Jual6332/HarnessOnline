import React from 'react'; 

class Child extends React.Component {
  constructor(props) { 
  	super(props); 
  	this.handleChange = this.handleChange.bind(this); 
	}
  
  handleChange(e){
    const name = e.target.value;
    this.props.onChange(name);
  }
  
  render() { 
    return ( 
      <div> 
        <h1> Hey my name is {this.props.name}! </h1> 
        <select id="great-names" onChange={this.handleChange}> 
          <option value="Unavailability Processing"> Unavailability Processing </option> 
          <option value="Initiate Contact Scheduling"> Initiate Contact Scheduling </option> 
          <option value="PassPlan Activity Allocation"> PassPlan Activity Allocation </option> 
        </select>
      </div> 
    ); 
  } 
}

export default Child;