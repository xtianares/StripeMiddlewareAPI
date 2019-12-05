const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.Question
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Question
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.Question
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByQuestionId: (req, res) => {
    db.Question
      .findOne({ questionId: req.params.questionId })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // need to gate update properly, not all fields can be update
  update: (req, res) => {
    db.Question
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateByQuestionId: (req, res) => {
    db.Question
      .findOneAndUpdate({ questionId: req.params.questionId }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Question
      // .deleteOne({ _id: req.params.id })
      .findById(req.params.id)
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteByQuestionId: (req, res) => {
    db.Question
      // .deleteOne({ _id: req.params.id })
      .findOne({ questionId: req.params.questionId })
      .then(dbModel => dbModel.deleteOne())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
