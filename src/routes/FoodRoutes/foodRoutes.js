const express = require("express");
const router = express.Router();
const foodCateRoutes = require("./foodCategory.routes");
const dishRoutes = require("./dish.routes");
foodCateRoutes(router);
dishRoutes(router);

module.exports = router;
