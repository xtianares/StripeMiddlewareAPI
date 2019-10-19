const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const accountRoutes = require("./account");

// All routes
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/account", accountRoutes);

module.exports = router;
