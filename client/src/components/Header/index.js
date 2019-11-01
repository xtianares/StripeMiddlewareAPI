import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import "./style.scss";
import Navbar from "./Nav";


class Header extends Component {
  state = {
    isAuthenticated: false
  }
  
  render() {
    return (
      <section id="header_wrap" className="wrap clearfix">
        <Navbar />
      </section>
    );
  }
}

export default Header;