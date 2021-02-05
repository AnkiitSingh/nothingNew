var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var offerSchema = new Schema({
    photo: {
        data: Buffer,
        contentType: String
    },
});

// Create model from the schema
var offer = mongoose.model("offer", offerSchema);

// Export model
module.exports = offer;