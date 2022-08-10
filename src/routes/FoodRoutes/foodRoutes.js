const express = require('express');
const router = express.Router();
const foodCateRoutes = require("./foodCategory.routes")

foodCateRoutes(router);


module.exports = router;
