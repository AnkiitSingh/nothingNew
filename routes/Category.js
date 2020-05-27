var express = require("express");
var router = express.Router();
const {categoryAddition} = require("../controller/categoryController");

router.post("/create/category/admin", categoryAddition);

module.exports = router;