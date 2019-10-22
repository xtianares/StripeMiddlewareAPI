import React from "react";
import { Container, Row, Col } from 'reactstrap';

function NoMatch() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8" sm="12">
          <h1 className="text-center">404 Page Not Found...</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;