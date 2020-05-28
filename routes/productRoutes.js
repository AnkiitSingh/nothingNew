var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct, getProducts, updateProduct, deleteProduct} = require("../controller/productController");

router.get('/product/admin/get', getProducts);

router.post("/product/admin/create", createProduct);

router.put("/product/admin/update/:id", updateProduct);

router.delete('/product/admin/delete/:id', deleteProduct);

module.exports = router;