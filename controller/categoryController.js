const Category = require("../models/categorySchema");
const formidable = require("formidable");
const fs = require("fs");

exports.createCategory = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }
      //destructure the fields
      const { name, photo, products } = fields;
  
      if (!name || !products ) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }
  
      let category = new Category(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        category.photo.data = fs.readFileSync(file.photo.path);
        category.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      category.save((err, category) => {
        if (err) {
          res.status(400).json({
            error: "Saving product in DB failed",
          });
        }
        res.json(category);
      });
    });
  };

exports.formCategory = (req, res) => {
  res.render('categoryForm')
}