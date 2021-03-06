import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';
import API from "../../utils/API";

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
    productId: this.props.productId,
    planId: this.props.planId,
    processing: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.planId !== this.props.planId) {
      this.setState({ planId: this.props.planId });
    }
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
      this.setState({ processing: true });
      // this.props.stripe
      //   .createToken({ name: this.state.nameOnCard })
      //   .then((payload) => console.log('[token]', payload));
      this.props.stripe
        .createSource({
          type: 'card',
          owner: {
            name: this.state.nameOnCard,
          },
        })
        .then((payload) => {
          // call api to create subscription
          // console.log('[source]', payload.source)
          const orderData = {
            planId: this.state.planId,
            sourceData: payload.source
          }
          API.createOrder(orderData)
            .then(response => {
              // console.log(response.data);
              // console.log(response.data.data.latest_invoice.charge);
              this.setState({ processing: false });
              localStorage.setItem("receiptInvoice", JSON.stringify(response.data.data.latest_invoice))
              localStorage.setItem("receiptCharge", JSON.stringify(response.data.data.latest_invoice.charge))
              if (response.data.status === "success") {
                this.props.history.push("/receipt/" + this.state.productId);
              }
            })
            .catch(err => {
              this.setState({ processing: false });
              console.log(err)
            });
        });
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
          <Button className="app-btn next-btn" color="success" size="lg" type="submit">
            {this.state.processing ? <Spinner size="sm" color="light" /> : null}
            Checkout <i className="material-icons">arrow_forward</i>
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default injectStripe(CheckoutForm);