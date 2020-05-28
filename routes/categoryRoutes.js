var express = require("express");
var router = express.Router();
const {createCategory, formCategory} = require("../controller/categoryController");
const {Category}= require("../models/categorySchema");

router.post("/category/admin/create", createCategory);
router.get("/category/admin/create", formCategory);
module.exports = router;