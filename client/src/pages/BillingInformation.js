import React, { Component, Fragment } from "react";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';
import {
  Container,
  Row,
  Col,
  CustomInput,
} from 'reactstrap';
import {Helmet} from "react-helmet";
import API from "../utils/API";

const stripePK = process.env.REACT_APP_STRIPE_PK || process.env.REACT_APP_STRIPE_PK_TEST;

class CreateAccount extends Component {
  state = {
    productId: this.props.match.params.productId,
    planId: "",
    productData: {},
    plansData: [],
    stripe: null
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

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(stripePK) });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(stripePK) });
      });
    }
  }

  handleChange = event => {
    const { name, value, type, checked } = event.target;
    const theValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: theValue
    });
  }

  render() {
    // console.log(this.state.productData);
    // console.log(this.state.plansData);
    const productName = this.state.productData.name;
    const productPlans = this.state.plansData.map((plan) => {
      const amount = plan.amount / 100,
            seperator = plan.interval_count > 1 ? "every " + plan.interval_count : "/",
            interval = plan.interval_count > 1 ? plan.interval + "s" : plan.interval,
            label = `${plan.nickname} $${amount} ${plan.currency.toUpperCase()} ${seperator} ${interval}`;
      return (
        <CustomInput key={plan.id} id={plan.id} type="radio" name="planId" value={plan.id} label={label} onChange={this.handleChange} />
      )
    })

    return (
      <Fragment>
        <Helmet>
          <title>Assured Testbed App Demo</title>
          <link rel="canonical" href="https://assured.enterprises" />
        </Helmet>

        <Container>
          <Row className="justify-content-center">
            <Col lg="8" md="12" sm="12">
              <h3>Select a payment plan for "{productName}"</h3>
              {productPlans}

              <h3>Billing Information</h3>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CheckoutForm productId={this.state.productId} planId={this.state.planId} history={this.props.history} />
                </Elements>
              </StripeProvider>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default CreateAccount;
