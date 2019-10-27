const db = require("../models");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK);

// Defining methods for the snapController
module.exports = {
  // create: (req, res) => {
  //   db.Product
  //     // create product in our DB
  //     .create(req.body)
  //     // create stripe product of type service
  //     .then(dbModel => {
  //       stripe.products.create({
  //         name: dbModel.name,
  //         type: 'service',
  //       })
  //       // create stripe subscription plan of the current product
  //       .then(stripeProduct => {
  //         const amount = dbModel.price * 100 / 12;
  //         stripe.plans.create({
  //           product: stripeProduct.id,
  //           nickname: dbModel.name,
  //           currency: 'usd',
  //           interval: 'month',
  //           amount: amount,
  //         })
  //         .then(stripePlan => {
  //           db.Product.findByIdAndUpdate(dbModel._id, { stripe: { productId: stripeProduct.id, planId: stripePlan.id } }, { new: true })
  //             .then(dbModel => {
  //               res.json({
  //                 status: "success",
  //                 message: "Product created successfully!!!",
  //                 data: dbModel,
  //                 stripe: {
  //                   product: stripeProduct,
  //                   plans: stripePlan
  //                 }
  //               });
  //             })
  //             .catch(err => res.status(422).json(err));
  //         })
  //         .catch(err => res.status(422).json(err));
  //       })
  //       .catch(err => res.status(422).json(err));
  //     })
  //     .catch(err => res.status(422).json(err));
  // },
  findAll: (req, res) => {
    stripe.products.list({ 
      limit: 20
    })
    .then(productsData => res.json(productsData))
    .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    stripe.products.retrieve(req.params.id)
      .then(productData => {
        stripe.plans.list({
          // limit: 3,
          product: productData.id
        })
        .then(plansData => {
          res.json({
            productData,
            plansData
          });
        })
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  // update: (req, res) => {
  //   db.Product
  //     .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // delete: (req, res) => {
  //   db.Product
  //     .findById(req.params.id)
  //     .then(dbModel => dbModel.deleteOne())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

};
