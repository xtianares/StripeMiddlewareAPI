import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import "./style.scss";

class Header extends Component {
  state = {
    isAuthenticated: false
  }
  
  render() {
    return (
      <section id="header_wrap" className="wrap clearfix">
        <Container className="fluid">
          <Row>
            <Col sm="12" id="header">
              <a className="logo" href="/">Assured Testbed App Demo</a>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Header;