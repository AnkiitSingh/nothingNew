var express = require("express");
var router = express.Router();
const {createCategory} = require("../controller/categoryController");
const {Category}= require("../models/categorySchema");

router.post("/category/admin/create", createCategory , async (req,res)=>{ 

    const name = await Category.findOne(req.body.name);
    if (name) 
        return res.status(400).send('Category Already Exist.');

    let category = new Category(req.body);
    category= await category.save(); 
    res.send(category);
});

module.exports = router;