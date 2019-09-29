const router = require("express").Router();
const userController = require("../../controllers/userController");

// all users
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

  // find user by id
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
