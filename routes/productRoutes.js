var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { createProduct } = require("../controller/productController");
const Products = require('../models/productSchema');

router.get('/product/admin/get',async (req,res)=>{
    const products= await Product.find();
    res.send(products);
});

router.post("/product/admin/create", createProduct, async (req,res)=>{ 

    const name = await Product.findOne(req.body.name);
    if (name) 
        return res.status(400).send('Product Already Exist');

    let product = new Product(req.body);
    product= await product.save();
    res.send(product);
});

module.exports = router;