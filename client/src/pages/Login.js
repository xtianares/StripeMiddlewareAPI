import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from 'reactstrap';
import {Helmet} from "react-helmet";
import API from "../utils/API";

class Login extends Component {
  state = {
    email: "",
    password: "",
    productId: this.props.match.params.productId,
  };

  componentDidMount() {
    // console.log("it mounted");
    // const { productId } = this.props.match.params
  }

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    const theValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: theValue
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ processing: true });
    const { email, password } = this.state;
    API.login({
      email,
      password,
    })
      .then(accountData => {
        this.setState({ processing: false });
        console.log(accountData.data);
        if (accountData.data.status === "success") {
          console.log("You are logged in!");
          this.props.history.push("/billing-information/" + this.state.productId);
        }
      })
      .catch(err => {
        this.setState({ processing: false });
        console.log(err)
      });
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Assured Testbed App Demo</title>
          <link rel="canonical" href="https://assured.enterprises" />
        </Helmet>

        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="12" sm="12">
              <Form onSubmit={this.handleFormSubmit}>
                <h2>User Login</h2>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="email">Email</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.email} type="email" name="email" id="email" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" htmlFor="password">Password</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.password} type="password" name="password" id="password" data-hj-masked />
                  </Col>
                </FormGroup>

                <FormGroup className="form-row form-nav justify-content-end">
                  <Button className="app-btn next-btn" color="success" size="lg" type="submit">
                    {this.state.processing ? <Spinner size="sm" color="light" /> : null}
                    Continue <i className="material-icons">arrow_forward</i>
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Login;
