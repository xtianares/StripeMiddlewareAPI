const db = require("../models");

// Defining methods for the loginController
module.exports = {
  login: function(req, res) {
    // console.log(req.query);
    db.User
      .findOne(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
