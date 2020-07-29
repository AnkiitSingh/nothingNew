const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");
const formidable = require("formidable");
const fs = require("fs");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render("products", { products: products });
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
    const { name, description, category, price, quantity } = fields;

    if (!name || !description || !price || !quantity || !category) {
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
      res.redirect("/api/product");
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure the fields
    const { name, description, category, price, quantity } = fields;

    if (!name || !description || !category || !price || !quantity) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = await Product.findByIdAndUpdate(req.params.id, fields, {
      new: true,
    });

    if (!product) return res.status(404).send("Given ID was not found"); //404 is error not found

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

    console.log("bye");

    //save to the DB
    product.save((err, category) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      console.log("save");
      res.redirect("/api/product");
    });
  });
};

exports.formProduct = async (req, res) => {
  const categories = await Category.find();
  res.render("productForm", {
    categories: categories,
    first_val: "",
    link: "/api/product/admin/create",
    id: null,
    name: "",
    description: "",
    price: "",
    photo: "",
    quantity: "",
  });
};

exports.formProductEdit = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Given ID was not found");

  const categories = await Category.find();

  const category = await Category.findById(product.category);

  const { name, description, price, photo, quantity } = product;

  res.render("productForm", {
    categories,
    first_val: category,
    link: `/api/product/admin/update/${req.params.id}`,
    id: product._id,
    name,
    description,
    price,
    photo,
    quantity,
  });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.redirect("/api/product");
};

exports.filterProducts = async (req, res) => {
  const products = await Product.find({ category: req.params.categoryName });
  if (products[0] == null) {
    return res.send("No product found");
  }
  res.send(products);
}

exports.cartProduct = async (req, res) => {
  const products = await Product.find({ _id: req.params.id });
  if (products[0] == null) {
    return res.send("No product found");
  }
  res.send(products);
}

exports.getById = async (req, res) => {
  Product.find({ _id: req.params.id }, async function (err, value) {
    if (err) {
      res.send("Order not found")
    }
    if (value[0] == null) {
      res.send("No Orders Found")
    }
    value[0].photo = undefined
    res.send(value[0])
  })
}

exports.photoProducts = async (req, res, next) => {
  const products = await Product.find({ _id: req.params.id });
  if (products[0].photo.data) {
    res.set("Content-Type", products[0].photo.contentType);
    return res.send(products[0].photo.data);
  }
  res.send("not found")
}