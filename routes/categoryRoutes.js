var express = require("express");
var router = express.Router();
const { getCategories, categoryProducts, createCategory, getLowCategories, updateCategory, deleteCategory, formCategory, formCategoryEdit, saveOffer, showOffer } = require("../controller/categoryController");

router.get("/category/high", getCategories);

router.get("/category/low", getLowCategories);

router.get("/categoryForm", formCategory);

router.get("/categoryEdit-:id", formCategoryEdit);

router.get("/category/photo/:id", categoryProducts);

router.post("/category/admin/create", createCategory);

router.post("/category/admin/update/:id", updateCategory);

router.post('/category/admin/delete/:id', deleteCategory);

router.post('/offerImage', saveOffer);

router.get('/offerImage', showOffer);

module.exports = router;