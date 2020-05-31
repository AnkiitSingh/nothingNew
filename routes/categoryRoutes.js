var express = require("express");
var router = express.Router();
const {getCategories, createCategory, updateCategory, deleteCategory, formCategory, formCategoryEdit} = require("../controller/categoryController");

router.get("/category", getCategories);

router.get("/categoryForm", formCategory);

router.get("/categoryEdit-:id", formCategoryEdit);

router.post("/category/admin/create", createCategory);

router.post("/category/admin/update/:id", updateCategory);

router.post('/category/admin/delete/:id', deleteCategory);

module.exports = router;