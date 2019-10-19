const router = require("express").Router();
const companyController = require("../../controllers/companyController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

router.route("/create")
  .post(companyController.create);

router.route("/add-user")
  .put(isAuthenticated, companyController.addUser);

router.route("/update")
  .put(isAuthenticated, companyController.update);

router.route("/all")
  .get(isAuthenticated, isAuthorized, companyController.findAll);

// find user by id, needs to be last
router.route("/:id")
  .get(isAuthenticated, isAuthorized, companyController.findById)
  .put(isAuthenticated, isAuthorized, companyController.update)
  .delete(isAuthenticated, isAuthorized, companyController.delete);

module.exports = router;
