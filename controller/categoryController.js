const Category = require("../models/categorySchema");

exports.categoryAddition = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          err: "Not Able to save Admin",
        });
      }
      res.json({
        name: category.name,
      });
    });
  };