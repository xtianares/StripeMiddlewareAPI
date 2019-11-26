const router = require("express").Router();
const assessmentController = require("../../controllers/assessmentController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

router.route("/create")
  .post(isAuthenticated, isAuthorized, assessmentController.create);

router.route("/all")
  .get(isAuthenticated, isAuthorized, assessmentController.findAll);

router.route("/:id")
  .get(isAuthenticated, assessmentController.findById)
  .put(isAuthenticated, isAuthorized, assessmentController.update)
  .delete(isAuthenticated, isAuthorized, assessmentController.delete);

router.route("/sku/:sku")
  .get(isAuthenticated, assessmentController.findBySku)
  .put(isAuthenticated, isAuthorized, assessmentController.updateBySku)
  .delete(isAuthenticated, isAuthorized, assessmentController.deleteBySku);

module.exports = router;
