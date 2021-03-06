var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema Def //
var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  priority: {
    type: String,
    default: "Low",
    enum: ["High", "Low"]
  },
});

// Create model from the schema
var Category = mongoose.model("category", categorySchema);

// Export model
module.exports = Category;
