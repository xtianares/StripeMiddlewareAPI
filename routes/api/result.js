const router = require("express").Router();
const resultController = require("../../controllers/resultController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

router.route("/create")
  .post(isAuthenticated, isAuthorized, resultController.create);

router.route("/all")
  .get(isAuthenticated, isAuthorized, resultController.findAll);

router.route("/:id")
  .get(isAuthenticated, resultController.findById)
  .put(isAuthenticated, isAuthorized, resultController.update)
  .delete(isAuthenticated, isAuthorized, resultController.delete);

module.exports = router;
