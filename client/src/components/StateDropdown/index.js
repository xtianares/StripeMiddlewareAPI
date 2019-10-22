import React, { Component } from "react";
import {
  CustomInput
} from 'reactstrap';

import states from "./states.json";

class StateDropdown extends Component {
  state = {
    value: this.props.value
  }

  componentDidMount() {
    // console.log(this.state);
    // call the api here to get the product info
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.props.onChange(event)
    // console.log(this.value)
  }
  
  render() {
    return (
      <CustomInput onChange={this.handleInputChange} type="select" name={this.props.name} id={this.props.id} value={this.props.value} data-hj-masked>
        {
          states.map(item => (
            <option key={item.abbreviation} value={item.abbreviation}>
              {item.name}
            </option>
          ))
        }
      </CustomInput>
    );
  }
}

export default StateDropdown;