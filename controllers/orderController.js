const db = require("../models");

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    const orderData = req.body;
    const products = orderData.items;
    let orderTotal = 0;
    products.forEach(product => {
      orderTotal = orderTotal + product.price;
    });
    orderData.total = Number(Number(orderTotal).toFixed(2));
    orderData.company = req.decoded.company;

    db.Order
      .create(orderData)
      // .then(dbOrder => {
      //   // console.log(dbOrder);
      //   db.User.findByIdAndUpdate(dbOrder.user, { $push: { orders: dbOrder._id } }, { new: true })
      //     .then(dbUser => {
      //       // console.log(dbUser);
      //       console.log("Order added to user successfully!!!");
      //       // res.json({
      //       //   status: "success",
      //       //   message: "Order added to user successfully!!!",
      //       //   data: dbUser
      //       // })
      //     })
      //     .then(() => {
      //       res.json({
      //         status: "success",
      //         message: "Order created successfully!!!",
      //         data: dbOrder
      //       })
      //     })
      //     .catch(err => res.status(422).json(err));
      // })
      .then(dbOrder => {
        res.json({
          status: "success",
          message: "Order created successfully!!!",
          data: dbOrder
        })
      })
      .catch(err => res.status(422).json(err));
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
