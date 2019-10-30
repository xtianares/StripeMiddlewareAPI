const db = require("../models");
const stripeSK = process.env.REACT_APP_STRIPE_SK || process.env.REACT_APP_STRIPE_SK_TEST;
const stripe = require("stripe")(stripeSK);

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    const { planId, sourceData } = req.body;
    // create stripe customer
    // collect payment info
    // create subscription in stripe for the customer
    db.User.findById(req.decoded.id)
      .populate({
        path: "company",
      })
      .then(userInfo => {
        console.log(userInfo.company)
        return stripe.customers
          .create({
            name: userInfo.company.name,
            // name: userInfo.firstName + " " + userInfo.lastName,
            email: userInfo.email,
            phone: userInfo.phone,
            source: sourceData.id, // token created from Elements, collected from CC form https://stripe.com/docs/payments/cards/collecting/web
            metadata: {}
          })
      })
      // .then(customer => {
      //   return stripe.customers.update(customer.id, {
      //     source: sourceToken,
      //   })
      //   // stripe.customers.createSource(customer.id, {
      //   //   source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
      //   //   source: 'tok_visa',
      //   // });
      // })
      .then(customer => {
        return stripe.subscriptions.create({
          customer: customer.id, // customer ID from the newly created
          items: [{
            plan: planId // need to grab this from the request
          }]
        })
      })
      .then(subscription => {
        res.json({
          status: "success",
          message: "Subscription created successfully!!!",
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
