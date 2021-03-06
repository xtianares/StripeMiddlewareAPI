const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.Assessment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Assessment
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Assessment
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBySku: (req, res) => {
    db.Assessment
      .findOne({ sku: req.params.sku })
      // .populate("theQuestions")
      .populate("questions", "questionId category question")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // need to gate update properly, not all fields can be update
  update: (req, res) => {
    db.Assessment
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateBySku: (req, res) => {
    db.Assessment
      .findOneAndUpdate({ sku: req.params.sku }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Assessment
      // .deleteOne({ _id: req.params.id })
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteBySku: (req, res) => {
    db.Assessment
      // .deleteOne({ _id: req.params.id })
      .findOne({ sku: req.params.sku })
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
