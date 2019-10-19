const router = require("express").Router();
const accountController = require("../../controllers/accountController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

// create all users
router.route("/create")
  .post(accountController.create);

// add all users
router.route("/add-user")
  .put(isAuthenticated, accountController.addUser);

router.route("/update")
  .put(isAuthenticated, accountController.update);

router.route("/all")
  .get(isAuthenticated, isAuthorized, accountController.findAll);

// find user by id, needs to be last
router.route("/:id")
  .get(isAuthenticated, isAuthorized, accountController.findById)
  .put(isAuthenticated, isAuthorized, accountController.update)
  .delete(isAuthenticated, isAuthorized, accountController.delete);

module.exports = router;
