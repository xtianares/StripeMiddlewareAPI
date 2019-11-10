const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const { isAuthenticated, isAuthorized } = require('../../utils/auth');

// get all users
router.route("/create")
  .post(isAuthenticated, orderController.create);

router.route("/invoice/:id")
  .get(isAuthenticated, orderController.findInvoice);

// user login
router.route("/all")
  .get(isAuthenticated, isAuthorized, orderController.findAll);

// find user by id, needs to be last
router.route("/:id")
  .get(isAuthenticated, orderController.findById)
  .put(isAuthenticated, isAuthorized, orderController.update)
  .delete(isAuthenticated, isAuthorized, orderController.delete);

module.exports = router;
