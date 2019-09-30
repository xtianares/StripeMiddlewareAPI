const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Defining methods for the loginController
module.exports = {
  // login: function(req, res) {
  //   // console.log(req.body);
  //   db.User
  //     .findOne({
  //       username: req.body.username
  //     })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  login: function (req, res, next) {
    // console.log(req.body);
    db.User
      .findOne({
        username: req.body.username
      }, function (err, userInfo) {
        if (err) {
          next(err);
        } else {
          console.log(req.body.password,);
          console.log(userInfo.password);
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({
              id: userInfo._id
            }, req.app.get('secretKey'), {
              expiresIn: '24h'
            });
            res.json({
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
              message: "Invalid username/password!!!",
              data: null
            });
          }
        }
      });
  }

};
