const db = require("../models");
const stripeSK = process.env.REACT_APP_STRIPE_SK || process.env.REACT_APP_STRIPE_SK_TEST;
const stripe = require("stripe")(stripeSK);

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    const { planId, sourceData } = req.body;
    const customerDecodedId = req.decoded.id;
    let userCompanyId = "";
    // const stripeData = {};
    // create stripe customer
    // collect payment info
    // create subscription in stripe for the customer
    db.User.findById(customerDecodedId)
      .populate({
        path: "company"
      })
      .then(userInfo => {
        userCompanyId = userInfo.company._id;
        // console.log(userInfo); 
        if (userInfo.company && userInfo.company.stripe && userInfo.company.stripe.customerId) {
          return userInfo
        }
        else {
          return stripe.customers.create({
            name: userInfo.company.name,
            email: userInfo.email,
            phone: userInfo.phone,
            source: sourceData.id, // token created from Elements
            metadata: {
              companyId: userInfo.company.id,
            }
          })
        }
      })
      .then(customer => {
        // console.log(customer);
        if (customer.company && customer.company.stripe && customer.company.stripe.customerId) {
          return customer
        }
        else {
          // console.log(customer);
          // stripeData.customerId = customer.id;
          // stripeData.metadata = customer.metadata;
          return db.Company.findByIdAndUpdate(customer.metadata.companyId, {
            stripe: { customerId: customer.id }
          }, { new: true })
        }
      })
      .then(company => {
        // console.log(company);
        let stripeCustomerId = "";
        if (company.company && company.company.stripe && company.company.stripe.customerId) {
          stripeCustomerId = company.company.stripe.customerId;
        }
        else {
          stripeCustomerId = company.stripe.customerId;
        }

        const subscription = stripe.subscriptions.create({
          customer: stripeCustomerId, // customer ID from the customer
          items: [{
            plan: planId // need to grab this from the request
          }],
          metadata: {
            companyId: company.id,
          },
          expand: ['latest_invoice', 'latest_invoice.charge', 'plan.product'],
        })
        const order = subscription.then((subscription) => {
          // console.log(subscription)
          console.log(userCompanyId)
          return db.Order.create({
            company: userCompanyId, // taken from from logged in user above
            assessments: subscription.plan.product.metadata.assessments.replace(" ", "").split(","),
            stripe: {
              invoice: subscription.latest_invoice.id,
              productId: subscription.plan.product.id,
              subscriptionId: subscription.id,
            },
          })
        });
        return Promise.all([subscription, order]).then(([subscriptionResult, orderResult]) => {
          return [subscriptionResult, orderResult]
        });

        // return stripe.subscriptions.create({
        //   customer: stripeCustomerId, // customer ID from the customer
        //   items: [{
        //     plan: planId // need to grab this from the request
        //   }],
        //   metadata: {
        //     companyId: company.id,
        //   },
        //   expand: ['latest_invoice', 'latest_invoice.charge', 'plan.product'],
        // })
      })
      .then(subscription => {
        res.json({
          status: "success",
          message: "Subscription created successfully!!!",
          data: subscription[0]
        })
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
      // .catch(err => res.status(422).json(err));
  },
  findInvoice: (req, res) => {
    // console.log(req.params.id);
    // const { invoiceId } = req.body;
    // let receiptData = {};
    stripe.invoices.retrieve(
      req.params.id, {
        expand: ['charge'],
      }
    )
    .then(invoiceData => {
      // receiptData.invoice = invoiceData;
      // receiptData.charge = invoiceData.charge;
      invoiceData.status = "success";
      res.json(invoiceData)
    })
    // .then(chargeData => {
    //   receiptData.charge = chargeData;
    //   receiptData.status = "success";
    //   res.json(receiptData)
    // })
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
