var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct } = require("../controller/productController");
const Products = require('../models/productSchema');

router.get('/product/admin/get',async (req,res)=>{
    const products= await Products.find();
    res.send(products);
});

router.post("/product/admin/create", createProduct);

module.exports = router;