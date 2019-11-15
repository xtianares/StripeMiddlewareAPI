const router = require("express").Router();
const userController = require("../../controllers/userController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

// get all users
router.route("/create")
  .post(userController.create);

// user login
router.route("/login")
  .post(userController.login);

// user logout, deletes cookies
router.route("/logout")
  .get(userController.logout);

// find logged in user info
router.route("/me")
  .get(isAuthenticated, userController.findMe)
  .put(isAuthenticated, userController.update);

router.route("/all")
  .get(isAuthenticated, isAuthorized, userController.findAll);

// find user by id, needs to be last
router.route("/:id")
  .get(isAuthenticated, isAuthorized, userController.findById)
  .put(isAuthenticated, isAuthorized, userController.update)
  .delete(isAuthenticated, isAuthorized, userController.delete);

module.exports = router;
