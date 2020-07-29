var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct, photoProducts, cartProduct, getById, getProducts, updateProduct, deleteProduct, formProduct, formProductEdit, filterProducts } = require("../controller/productController");

router.get("/product", getProducts);

router.get("/productForm", formProduct);

router.get("/product/:categoryName", filterProducts);

router.get("/getProduct/:id", getById);
//rote to get product photo
router.get("/product/photo/:id", photoProducts);

router.get("/productEdit-:id", formProductEdit);

router.get("/cart/:id", cartProduct);

router.post("/product/admin/create", createProduct);

router.post("/product/admin/update/:id", updateProduct);

router.post('/product/admin/delete/:id', deleteProduct);

module.exports = router;