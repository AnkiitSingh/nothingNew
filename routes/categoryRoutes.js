var express = require("express");
var router = express.Router();
const {getCategories,createCategory, updateCategory, deleteCategory} = require("../controller/categoryController");

router.get("/category/admin/get", getCategories);

router.post("/category/admin/create", createCategory);

router.put("/category/admin/update/:id", updateCategory);

router.delete('/category/admin/delete/:id', deleteCategory);

module.exports = router;