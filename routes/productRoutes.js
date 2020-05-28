var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct, getProducts, updateProduct} = require("../controller/productController");

router.get('/product/admin/get', getProducts);

router.post("/product/admin/create", createProduct);

router.put("/product/admin/update", updateProduct);

module.exports = router;