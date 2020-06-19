const Category = require("../models/categorySchema");
const formidable = require("formidable");
const fs = require("fs");

exports.getCategories = async (req, res) => {
  console.log("we hit the route");
  const categories = await Category.find();
  res.send(categories);
};

exports.createCategory = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields

    const { name, photo } = fields;

    if (!name) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let category = new Category(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 300000) {
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
      res.send("saved");
    });
  });
};

exports.updateCategory = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields

    const { name, photo } = fields;

    console.log("file=" + photo);

    if (!name) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let category = await Category.findByIdAndUpdate(req.params.id, fields, {
      new: true,
    });

    if (!category) return res.status(404).send("Given ID was not found"); //404 is error not found

    console.log(file);
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

    console.log("bye");

    //save to the DB
    category.save((err, category) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      console.log("save");
      res.redirect("/api/category");
    });
  });
};

exports.formCategory = (req, res) => {
  res.render("categoryForm", {
    link: "/api/category/admin/create",
    id: null,
    name: "",
    photo: "",
  });
};

exports.formCategoryEdit = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Given ID was not found");

  res.render("categoryForm", {
    link: `/api/category/admin/update/${req.params.id}`,
    id: category._id,
    name: category.name,
    photo: category.photo,
  });
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.redirect("/api/category");
};
