const db = require("../models");

// Defining methods for the snapController
module.exports = {
  create: (req, res) => {
    let orderDetails = req.body;
    orderDetails.user = req.decoded.id;
    // console.log(orderDetails);
    db.Order
      .create(orderDetails)
      .then(dbOrder => {
        console.log(dbOrder);
        db.User.findByIdAndUpdate(dbOrder.user, { $push: { orders: dbOrder._id } }, { new: true })
          .then(dbUser => {
            // console.log(dbUser);
            console.log("Order added to user successfully!!!");
            // res.json({
            //   status: "success",
            //   message: "Order added to user successfully!!!",
            //   data: dbUser
            // })
          })
          .catch(err => res.status(422).json(err));
      })
      .then(dbOrder => {;
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
      .populate("items.product")
      .populate("user.email")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Order
      .findById(req.params.id)
      .populate("items.product")
      // .populate("user")
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
