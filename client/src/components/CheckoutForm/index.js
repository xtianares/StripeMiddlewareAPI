import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';
import "./style.scss";

const handleBlur = (en) => {
  console.log('[blur]', en);
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};
const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


class CheckoutForm extends Component {
  state = {
    fontSize: "16px",
    nameOnCard: "",
  }
  handleChange = event => {
    const { name, value, type, checked } = event.target;
    const theValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: theValue
    });
  }
  handleFormSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken({ name: this.state.nameOnCard })
        .then((payload) => console.log('[token]', payload));
      this.props.stripe
        .createSource({
          type: 'card',
          owner: {
            name: this.state.nameOnCard,
          },
        })
        .then((payload) => console.log('[source]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <FormGroup className="form-row">
          <Label sm={3} className="text-sm-right" for="nameOnCard">Name on Card</Label>
          <Col sm={8}>
            <Input onChange={this.handleChange} value={this.state.nameOnCard} type="text" name="nameOnCard" id="nameOnCard" data-hj-masked />
          </Col>
        </FormGroup>
        <FormGroup className="form-row">
          <Label sm={3} className="text-sm-right" htmlFor="password">Card number</Label>
          <Col sm={8}>
            <CardNumberElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.state.fontSize)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="form-row">
          <Label sm={3} className="text-sm-right" htmlFor="password">Expiration date</Label>
          <Col sm={8}>
            <CardExpiryElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="form-row">
          <Label sm={3} className="text-sm-right" htmlFor="password">CVC</Label>
          <Col sm={8}>
            <CardCVCElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </Col>
        </FormGroup>

        <FormGroup className="form-row form-nav justify-content-end">
          <Button className="app-btn next-btn" color="success" size="lg" type="submit">Checkout <i className="material-icons">arrow_forward</i></Button>
        </FormGroup>
      </Form>
    );
  }
}

export default injectStripe(CheckoutForm);