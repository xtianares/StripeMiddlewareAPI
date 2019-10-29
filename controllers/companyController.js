const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Defining methods for the userController
module.exports = {
  create: (req, res) => {
    // console.log(req.body);
    const { userData, companyData } = req.body;
    if (userData.password) {
      userData.password = bcrypt.hashSync(userData.password, saltRounds);
    }
    delete userData.role;
    // new account, creates the company
    db.Company
      .create(companyData)
      .then(companyData => {
        userData.company = companyData._id;
        // creates the main user and then add it the the newly created company
        db.User
          .create(userData)
          .then(userInfo => {
            db.Company.findByIdAndUpdate(userInfo.company, { $push: { users: userInfo._id } }, { new: true })
              .then(() => {
                const token = jwt.sign({
                  id: userInfo._id,
                  role: userInfo.role,
                  company: userInfo.company
                }, req.app.get('secretKey'), {
                  expiresIn: '12h',
                  issuer: "AssuredApp",
                });
                const secureFlag = process.env.NODE_ENV !== "development" ? true : false; // set false if in Development environment and true in Production environment
                res.header('x-auth-header', token).cookie('userToken', token, { expires: new Date(Date.now() + 43200000), httpOnly: true, secure: secureFlag }).json({
                  status: "success",
                  message: "User created and login successfully!!!",
                  data: {
                    user: userInfo,
                    token: token
                  }
                });
              })
              .catch(err => res.status(422).json(err));
          })
          .catch(err => res.status(422).json(err));
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
