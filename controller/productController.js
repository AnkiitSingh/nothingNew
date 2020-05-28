const Product = require("../models/productSchema");
const formidable = require("formidable");
const fs = require("fs");

exports.getProducts = async (req,res)=>{
  const products= await Product.find();
  res.send(products);
};

exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }
    
      //destructure the fields
      const { name, description, price, quantity } = fields;
  
      if (!name || !description || !price || !quantity) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }
  
      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving product in DB failed",
          });
        }
        res.json(product);
      });
    });
  };

exports.updateProduct= (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, async (err, fields, file) => {

      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }

      //destructure the fields
      const { name, description, price, quantity } = fields;
  
      if (!name || !description || !price || !quantity)  {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }

      let product= await Product.findByIdAndUpdate(req.params.id,fields,{new: true});

      if(!product)
        return res.status(404).send("Given ID was not found");//404 is error not found
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      console.log('bye');
  
      //save to the DB
      product.save((err, category) => {
        if (err) {
          res.status(400).json({
            error: "Saving product in DB failed",
          });
        }
        console.log('save');
        res.json(category);
      });
    });
};

exports.deleteProduct= async (req,res)=>{
  const product=await Product.findByIdAndRemove(req.params.id);
  if(!product)
      return res.status(404).send("Given ID was not found");//404 is error not found

  res.send(product);
};

exports.formProduct = (req, res) => {
  res.render('categoryForm')
}

exports.formProductEdit = (req, res) => {
  res.render('categoryForm')
}
