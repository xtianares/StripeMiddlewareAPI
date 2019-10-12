const router = require("express").Router();
const productController = require("../../controllers/productController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

// get all users
router.route("/create")
  .post(isAuthenticated, isAuthorized, productController.create);

// user login
router.route("/all")
  .get(productController.findAll);

// find user by id, needs to be last
router.route("/:id")
  .get(productController.findById)
  .put(isAuthenticated, isAuthorized, productController.update)
  .delete(isAuthenticated, isAuthorized, productController.delete);

module.exports = router;
