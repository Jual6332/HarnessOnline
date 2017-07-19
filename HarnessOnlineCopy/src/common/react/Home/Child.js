import React from 'react'; 

class FormRender extends React.Component {
  constructor(props) { 
  	super(props); 
  	this.handleChange = this.handleChange.bind(this); 
	}
  
    handleChange(e){
			const name = e.target.value;
      this.props.onChange(name);
      console.log("This has been changed!");
    }
  
  render() { 
    return ( 
      <div> 
        <h1> Hey my name is {this.props.name}! </h1> 
        <select id="great-names" onChange={this.handleChange}> 
          <option value="Frarthur"> Frarthur </option> 
          <option value="Gromulus"> Gromulus </option> 
          <option value="Thinkpiece"> Thinkpiece </option> 
        </select>
      </div> 
    ); 
  } 
}

export default FormRender;