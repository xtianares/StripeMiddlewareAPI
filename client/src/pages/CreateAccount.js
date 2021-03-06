import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
  Button,
  Spinner
} from 'reactstrap';
import {Helmet} from "react-helmet";
import API from "../utils/API";
import StateDropdown from "../components/StateDropdown";

class CreateAccount extends Component {
  state = {
    firstName: "",
    lastName: "",
    companyName: "",
    street1: "",
    street2: "",
    city: "",
    postalCode: "",
    state: "",
    country: "US",
    phone: "",
    email: "",
    validateEmail: "",
    password: "",
    productId: this.props.match.params.productId,
    planId: "",
    productData: {},
    plansData: [],
    processing: false
  };

  componentDidMount() {
    // console.log("it mounted");
    // const { productId } = this.props.match.params
    API.getProductByID(this.state.productId)
      .then(response => {
        // console.log(response.data);
        this.setState({
          productData: response.data.productData,
          plansData: response.data.plansData.data
        })
      })
      .catch(err => console.log(err));
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
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      companyName,
      street1,
      street2,
      city,
      postalCode,
      state,
      country
    } = this.state
    API.createAccount({
      userData: {
        firstName,
        lastName,
        email,
        phone,
        password,
      },
      companyData: {
        name: companyName,
        street1,
        street2,
        city,
        postalCode,
        state,
        country,
      }
    })
      .then(accountData => {
        this.setState({ processing: false });
        console.log(accountData.data);
        if (accountData.data.status === "success") {
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
                <h2>Create Account</h2>
                <p>Please provide the following information for the designated Point of Contact for the company. This will be our primary way of contacting you.</p>
                {/* <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="street1">Company Name</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.companyName} type="text" name="companyName" id="companyName" data-hj-masked />
                  </Col>
                </FormGroup> */}
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="firstname">First Name</Label>
                  <Col sm={8}>
                    <Input sm={4} onChange={this.handleChange} value={this.state.firstName} type="text" name="firstName" id="firstname" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="lastname">Last Name</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.lastName} type="text" name="lastName" id="lastname" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="phone">Phone</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.phone} type="tel" name="phone" id="phone" pattern="^\([1-9]\d{2}\) \d{3}-\d{4}$" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="email">Email</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.email} type="email" name="email" id="email" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="validateEmail">Validate Email</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.validateEmail} type="email" name="validateEmail" id="validateEmail" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" htmlFor="password">Password</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.password} type="password" name="password" id="password" data-hj-masked />
                  </Col>
                </FormGroup>

                <h2>Company Information</h2>
                <p><strong className="text-danger">All mailed correspondence (if any) from our office will be sent to the address below.</strong></p>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="street1">Company Name</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.companyName} type="text" name="companyName" id="companyName" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="street1">Address</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.street1} type="text" name="street1" id="street1" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="street2">Suite. Apt. #, etc.</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.street2} type="text" name="street2" id="street2" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="city">City</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.city} type="text" name="city" id="city" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="state">State</Label>
                  <Col sm={8}>
                    <StateDropdown onChange={this.handleChange} value={this.state.state} name="state" id="state" data-hj-masked />
                  </Col>
                </FormGroup>
                <FormGroup className="form-row">
                  <Label sm={3} className="text-sm-right" for="postalCode">Zip Code</Label>
                  <Col sm={8}>
                    <Input onChange={this.handleChange} value={this.state.postalCode} type="text" name="postalCode" id="postalCode" data-hj-masked />
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

export default CreateAccount;
