const router = require("express").Router();
const userController = require("../../controllers/userController");

// get all users
router.route("/")
  .post(userController.create)
  .get(userController.findAll);

// find user by id
router.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
