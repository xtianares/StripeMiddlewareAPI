import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';
import {Helmet} from "react-helmet";
import API from "../utils/API";

class Receipt extends Component {
  state = {
    invoiceId: localStorage.getItem("invoiceId"),
    charge: JSON.parse(localStorage.getItem("receiptCharge")) || {},
    invoice: JSON.parse(localStorage.getItem("receiptInvoice")) || {},
    items: [],
    loaded: true
  };

  componentDidMount() {
    // console.log("it mounted");
    console.log(this.state.invoice.lines.data);
    console.log(this.state.charge);
  }

  timeToDate = timestamp => {
    var a = new Date(timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var theDate = month + ' ' + date + ' ' +  year;
    return theDate;
  }

  render() {
    const { invoice, charge, charge: { payment_method_details: { card } }, loaded } = this.state;
    const totalAmount = charge.amount / 100;
    const items = this.state.invoice.lines.data.map((item) => {
      const id = item.id,
            amount = item.amount / 100,
            description = item.description;
      return (
        <tr key={id}>
          <td className="item-description">{description}</td>
          <td className="item-amount">${amount}</td>
        </tr>
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
                <h3>Thank you for your purchase!</h3>
                <p>Please review that the information below is correct. Please note that you have been charge for the first payment cycle.</p>
                <Row>
                  <Col lg="4" sm="12">
                    <p>
                      Invoice #:<br />
                      {invoice.number}
                      {/* Receipt #: {charge.receipt_number} */}
                    </p>
                  </Col>
                  <Col lg="4" sm="12">
                    <p>
                      Date Paid:<br />
                      {this.timeToDate(charge.created)} <br />
                    </p>
                  </Col>
                  <Col lg="4" sm="12">
                    <p>
                      Payment method:<br />
                      <span className="card-network">{card.network}</span> – {card.last4}
                    </p>
                  </Col>
                </Row>
                
                <Table responsive className="receipt-summary">
                  <thead>
                    <tr>
                      <th colSpan="2">Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                    <tr>
                      <td className="item-description"><strong>Amount Paid</strong></td>
                      <td className="item-amount">${totalAmount}</td>
                    </tr>
                  </tbody>
                </Table>

                <p><a href={charge.receipt_url} target="_blank" rel="noopener nofollow">View receipt online</a></p>

                <p><em>If you have any questions, contact Assured Enterprises, Inc. at <a href="mailto:svigneault@assured.enterprises">svigneault@assured.enterprises</a> or call at <a href="tel:1561675911">+1 561-670-5911</a>.</em></p>
 
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Receipt;
