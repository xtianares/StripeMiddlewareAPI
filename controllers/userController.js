const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Defining methods for the userController
module.exports = {
  create: (req, res) => {
    // console.log(req.body);
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    db.User
      .create(req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => {
        res.json({
          status: "success",
          message: "User created successfully!!!",
          data: dbModel
        });
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.User
      .findById(req.params.id)
      .populate("orders")
      .populate("assessments")
      .populate("results")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    // make sure that passwords are hashed during updates
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    req.body.updatedAt = Date.now(); // only needed for users to set the updatedAt key
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new : true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: (req, res) => {
    // console.log(req.body);
    db.User
      .findOne({
        username: req.body.username
      })
      .then(userInfo => {
        // console.log(req.body.password);
        // console.log(userInfo.password);
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({
            id: userInfo._id
          }, req.app.get('secretKey'), {
            expiresIn: '12h'
          });
          res.json({
            status: "success",
            message: "User Found!!!",
            data: {
              user: userInfo,
              auth: true,
              token: token
            }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid username/password!!!",
            data: null
          });
        }
      })
      .catch(err => res.status(422).json({
        status: "error",
        message: "Invalid username/password!!!",
        data: null
      }));
  },

};
