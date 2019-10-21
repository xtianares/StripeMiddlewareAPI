const db = require("../models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    db.Product
      .create(req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => {
        stripe.products.create({
          name: dbModel.name,
          type: 'service',
          // description: dbModel.description
        })
        .then(stripeDb => {
          db.Product.findByIdAndUpdate(dbModel._id, { stripe: { productId: stripeDb.id } }, { new: true })
            .then(dbModel => {
              res.json({
                status: "success",
                message: "Product created successfully!!!",
                data: dbModel,
                stripe: stripeDb
              });
            })
            .catch(err => res.status(422).json(err));
        })  
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Product
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Product
      .findById(req.params.id)
      .populate("relatedProducts")
      // .then(dbModel => {
      //   console.log(dbModel.price);
      // })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Product
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Product
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
