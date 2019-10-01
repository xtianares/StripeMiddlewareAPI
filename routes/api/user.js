const router = require("express").Router();
const userController = require("../../controllers/userController");

// get all users
router.route("/create")
  .post(userController.create);

router.route("/all")
  .get(userController.findAll);

// user login
router.route("/login")
  .get(userController.login);

// find user by id, needs to be last
router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.delete);


module.exports = router;
