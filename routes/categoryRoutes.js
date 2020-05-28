var express = require("express");
var router = express.Router();
const {getCategories,createCategory, updateCategory} = require("../controller/categoryController");

router.get("/category/admin/get", getCategories);

router.post("/category/admin/create", createCategory);

router.put("/category/admin/update", updateCategory);

module.exports = router;