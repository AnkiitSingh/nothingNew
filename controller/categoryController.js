const Category = require("../models/categorySchema");
const Offer = require("../models/offerSchema");
const formidable = require("formidable");
const fs = require("fs");

exports.getCategories = async (req, res) => {
  const value = await Category.find({ priority: "High" }, async (err, data) => {
    if (err) {
      return res.json({
        message: "No category found"
      })
    }
    for (let i = 0; i < data.length; i++) {
      data[i].photo = undefined;
    }
    return await res.send(data)
  })
};

exports.getLowCategories = async (req, res) => {
  const value = await Category.find({ priority: "Low" }, async (err, data) => {
    if (err) {
      return res.json({
        message: "No category found"
      })
    }
    for (let i = 0; i < data.length; i++) {
      data[i].photo = undefined;
    }
    return await res.send(data)
  })
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
      res.redirect("/");
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


    if (!name) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let category = await Category.findByIdAndUpdate(req.params.id, {name}, {
      new: true,
    });

    if (!category) return res.status(404).send("Given ID was not found"); //404 is error not found


    //handle file here
    if (file.photo.size!=0) {
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

      res.redirect("/");
    });
  });
};

exports.formCategory = (req, res) => {
  res.render("categoryForm", {
    link: "/api/category/admin/create",
    id: null,
    name: "",
    photo: "",
    btn: "Create"
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
    btn: "Update"
  });
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Given ID was not found"); //404 is error not found

  res.redirect("/");
};

exports.categoryProducts = async (req, res) => {
  const category = await Category.find({ _id: req.params.id })
  if (category[0].photo.data) {
    res.set("Content-Type", category[0].photo.contentType);
    return res.send(category[0].photo.data);
  }
  res.send("not found")
}

exports.saveOffer = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    const { photo } = fields;
    if (!fields) {
      return res.json({ error: "No image found" })
    }
    if(!photo){
      return res.json({ error: "No image found" })
    }

    let offer = new Offer(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 300000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      offer.photo.data = fs.readFileSync(file.photo.path);
      offer.photo.contentType = file.photo.type;
    }

    //save to the DB
    offer.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      else if (data) {
        res.json({ message: "Data successfully saved" })
      }
    });
  })
}

exports.showOffer = async (req, res) => {
  const offer = await Offer.find({})
  if (offer[0].photo.data) {
    res.set("Content-Type", offer[0].photo.contentType);
    return res.send(offer[0].photo.data);
  }
  res.send("not found")
}