const router = require("express").Router();
const userController = require("../../controllers/userController");
const auth = require('../../utils/auth');

// get all users
router.route("/create")
  .post(userController.create);

router.route("/all")
  .get(userController.findAll);

// user login
router.route("/login")
  .get(userController.login);

// user logout, deletes cookies
router.route("/logout")
  .get(userController.logout);

// find logged user info
router.route("/me")
  .get(auth.validateToken, userController.findMe);

// find user by id, needs to be last
router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
