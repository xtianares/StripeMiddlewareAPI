const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const accountRoutes = require("./account");
const assessmentRoutes = require("./assessment");
const resultRoutes = require("./result");
const questionRoutes = require("./question");

// All routes
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/account", accountRoutes);
router.use("/assessment", assessmentRoutes);
router.use("/result", resultRoutes);
router.use("/question", questionRoutes);

module.exports = router;
