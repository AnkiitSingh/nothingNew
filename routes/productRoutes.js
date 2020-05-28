var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct, getProducts, updateProduct, deleteProduct, formProduct, formProductEdit} = require("../controller/productController");

router.get("/product", getProducts);

router.get("/productForm", formProduct);

router.get("/productEdit", formProductEdit);

router.post("/product/admin/create", createProduct);

router.put("/product/admin/update/:id", updateProduct);

router.delete('/product/admin/delete/:id', deleteProduct);

module.exports = router;