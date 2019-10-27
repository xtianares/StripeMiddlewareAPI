const db = require("../models");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK);

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    const orderData = req.body;
    const plans = orderData.items;
    orderData.total = Number(Number(orderTotal).toFixed(2));
    orderData.company = req.decoded.company;

    // create stripe customer
    // collect payment info
    // create subscription in stripe for the customer
    stripe.customers
      .create({
        description: orderData.company,
        name: "",
        email: "",
        phone: "",
        source: {}, // token created from Elements, collected from CC form https://stripe.com/docs/payments/cards/collecting/web
        metadata: {}
      })
      .then(customer => {
        return stripe.subscriptions.create({
          customer: customer.id, // customer ID from the newly created
          items: [{
            plan: orderData.planID // need to grab this from the request
          }]
        })
      })
      // .then(customer => {
      //   return stripe.customers.createSource(customer.id, {
      //     source: 'tok_visa',
      //   })
      // })
      .then(subscription => {
        res.json({
          status: "success",
          message: "Order created successfully!!!",
          data: subscription
        })
      })
      .catch(err => res.status(422).json(err));
    

    // db.Order
    //   .create(orderData)
    //   .then(dbOrder => {
    //     res.json({
    //       status: "success",
    //       message: "Order created successfully!!!",
    //       data: dbOrder
    //     })
    //   })
    //   .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Order
      .find(req.query)
      .populate("items.product", "name description price")
      .populate("user", "_id email")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Order
      .findById(req.params.id)
      .populate("items.product", "name description price thumbnail sku")
      .populate("user", "email")
      // .then(dbModel => {
      //   console.log(dbModel.price);
      // })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Order
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Order
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
