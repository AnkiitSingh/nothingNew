var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct, getProduct } = require("../controller/productController");
const Products = require('../models/productSchema');

router.get('/product/admin/get', getProduct);

router.post("/product/admin/create", createProduct);

module.exports = router;