var express = require("express");
var router = express.Router();
const {createCategory} = require("../controller/categoryController");

router.post("/category/admin/create", createCategory);

module.exports = router;