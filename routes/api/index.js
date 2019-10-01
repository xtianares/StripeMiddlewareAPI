const router = require("express").Router();
const userRoutes = require("./user");

// All routes
router.use("/user", userRoutes);

module.exports = router;
