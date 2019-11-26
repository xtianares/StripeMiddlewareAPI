const db = require("../models");
const stripeSK = process.env.REACT_APP_STRIPE_SK || process.env.REACT_APP_STRIPE_SK_TEST;
const stripe = require("stripe")(stripeSK);

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    const { planId, sourceData } = req.body;
    const stripeData = {};
    // create stripe customer
    // collect payment info
    // create subscription in stripe for the customer
    db.User.findById(req.decoded.id)
      .populate({
        path: "company"
      })
      .then(userInfo => {
        // console.log(userInfo.company.id)
        // if user info doesn't have stripe customer info
        return stripe.customers.create({
            name: userInfo.company.name,
            email: userInfo.email,
            phone: userInfo.phone,
            source: sourceData.id, // token created from Elements
            metadata: {
              companyId: userInfo.company.id,
            }
          })
      })
      .then(customer => {
        // console.log(customer);
        stripeData.customerId = customer.id;
        stripeData.metadata = customer.metadata;
        return db.Company.findByIdAndUpdate(customer.metadata.companyId, { 
          stripe: { customerId: customer.id } 
        }, { new: true })
      })
      .then(company => {
        // console.log(company);
        return stripe.subscriptions.create({
          customer: company.stripe.customerId, // customer ID from the newly created
          items: [{
            plan: planId // need to grab this from the request
          }],
          metadata: {
            companyId: company.id,
          }
        })
      })
      // .then(subscription => {
      //   // console.log(customer);
      //   return db.Company.findByIdAndUpdate(stripeData.metadata.companyId, {
      //     stripe: { customerId: stripeData.customerId }
      //   }, { new: true })
      // })
      .then(subscription => {
        res.json({
          status: "success",
          message: "Subscription created successfully!!!",
          data: subscription
        })
      })
      .catch(err => res.status(422).json(err));
  },
  findInvoice: (req, res) => {
    console.log(req.params.id);
    // const { invoiceId } = req.body;
    let receiptData = {};
    stripe.invoices.retrieve(
      req.params.id
    )
    .then(invoiceData => {
      receiptData.invoice = invoiceData;
      // console.log(company);
      return stripe.charges.retrieve(
        invoiceData.charge
      )
    })
    .then(chargeData => {
      receiptData.charge = chargeData;
      receiptData.status = "success";
      res.json(receiptData)
    })
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
