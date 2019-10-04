const router = require("express").Router();
const userController = require("../../controllers/userController");
const verifyToken = require('../../utils/auth');

// get all users
router.route("/create")
  .post(userController.create);

router.route("/all")
  .get(userController.findAll);

// user login
router.route("/login")
  .get(userController.login);

// logged in login
router.route("/me/:id")
  .get(verifyToken.validateToken, userController.findById)

// find user by id, needs to be last
router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
