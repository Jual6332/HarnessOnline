import React from 'react'; 

class FormRender extends React.Component {
  constructor(props) { 
  	super(props); 
    this.state = {value: ""};
  	this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
	}
  
  handleChange(event){
    this.setState({value: event.target.value});
		//const name = e.target.value;
    //this.props.onChange(name);
  }

  handleSubmit(event){
    alert("The name has been changed");
    event.preventDefault();
  }
  
  render() { 
    return ( 
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Name:</p>
          <p><textarea value={this.state.value} onChange={this.handleChange} /></p>
        </label>
        <p><input type="submit" value="Submit" /></p>
      </form>
    ); 
  } 
}

export default FormRender;