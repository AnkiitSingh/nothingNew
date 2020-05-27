var express = require("express");
var router = express.Router();
const {createCategory} = require("../controller/categoryController");
const {Category}= require("../models/categorySchema");

router.post("/category/admin/create", createCategory);

module.exports = router;