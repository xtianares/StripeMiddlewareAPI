const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Defining methods for the userController
module.exports = {
  create: (req, res) => {
    // console.log(req.body);
    const companyData = {
      name: req.body.companyName
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    delete req.body.companyName;
    delete req.body.role;
    const userData = req.body;
    db.Company
      .create(companyData)
      .then(companyData => {
        userData.company = companyData._id;
        db.User
          .create(userData)
          .then(dbModel => {
            db.Company.findByIdAndUpdate(dbModel.company, { $push: { users: dbModel._id } }, { new: true })
              .then(() => {
                res.json({
                  status: "success",
                  message: "Account created successfully!!!",
                  data: dbModel
                })
              })
              .catch(err => res.status(422).json(err));
          })
      })
      .catch(err => res.status(422).json(err));
  },
  addUser: (req, res) => {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    const userData = req.body;
    db.User
      .create(userData)
      .then(dbModel => {
        db.Company
          .findByIdAndUpdate(req.decoded.company, { $push: { users: dbModel._id } }, { new: true })
          .then(dbModel => {
            res.json({
              status: "success",
              message: "User added successfully!!!",
              data: dbModel
            })
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Company
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Company
      .findById(req.params.id)
      .populate("orders")
      .populate("assessments")
      .populate("results")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // need to gate update properly, not all fields can be update
  update: (req, res) => {
    db.Company
      .findOneAndUpdate({ _id: req.decoded.company }, req.body, {new : true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Company
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
