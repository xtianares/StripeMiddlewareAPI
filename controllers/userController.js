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
  // need to gate update properly, not all fields can be update
  update: (req, res) => {
    // make sure that passwords are hashed during updates
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    req.body.updatedAt = Date.now(); // only needed for users to set the updatedAt key
    if (req.decoded.role !== "admin") {
      delete req.body.email;
      delete req.body.role;
      delete req.body.orders;
      delete req.body.assessments;
    }
    db.User
      .findOneAndUpdate({ _id: req.decoded.id }, req.body, {new : true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.User
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: (req, res) => {
    // console.log(req.body);
    db.User
      .findOne({
        email: req.body.email
      })
      .then(userInfo => {
        // console.log(req.body.password);
        // console.log(userInfo.password);
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({
            id: userInfo._id,
            role: userInfo.role
          }, req.app.get('secretKey'), {
            expiresIn: '12h',
            issuer: "AssuredApp",
          });
          const secureFlag = process.env.NODE_ENV !== "Development" ? true : false; // set false if in Development environment and true in Production environment
          res.header('x-auth-header', token).cookie('userToken', token, { expires: new Date(Date.now() + 43200000), httpOnly: true, secure: secureFlag }).json({
            status: "success",
            message: "User Found!!!", 
            data: {
              user: userInfo,
              token: token
            }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid email/password!!!",
            data: null
          });
        }
      })
      .catch(err => res.status(422).json({
        status: "error",
        message: "Invalid email/password!!!",
        data: null
      }));
  },
  findMe: (req, res) => {
    // console.log(req.cookies);
    db.User
      .findById(req.decoded.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  logout: (req, res) => {
    res.clearCookie("userToken");
    res.send("User logout successfully!");
  },

};
