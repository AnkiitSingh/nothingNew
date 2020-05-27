const Products = require("../models/productSchema");
const formidable = require("formidable");
const fs = require("fs");

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
  
      let product = new Products(fields);
  
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

exports.getProduct = async (req,res)=>{
  const products= await Products.find();
  res.send(products)
};