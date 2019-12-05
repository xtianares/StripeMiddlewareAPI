const router = require("express").Router();
const questionController = require("../../controllers/questionController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

router.route("/create")
  .post(isAuthenticated, isAuthorized, questionController.create);

router.route("/all")
  .get(isAuthenticated, isAuthorized, questionController.findAll);

router.route("/:id")
  .get(isAuthenticated, questionController.findById)
  .put(isAuthenticated, isAuthorized, questionController.update)
  .delete(isAuthenticated, isAuthorized, questionController.delete);

router.route("/id/:questionId")
  .get(isAuthenticated, questionController.findByQuestionId)
  .put(isAuthenticated, isAuthorized, questionController.updateByQuestionId)
  .delete(isAuthenticated, isAuthorized, questionController.deleteByQuestionId);

module.exports = router;
