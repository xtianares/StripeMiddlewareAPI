const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");

// All routes
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/orderf", orderRoutes);

module.exports = router;
