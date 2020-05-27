var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct } = require("../controller/productController");

router.post("/product/admin/create", createProduct );


module.exports = router;