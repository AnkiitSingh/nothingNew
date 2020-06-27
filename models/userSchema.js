var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema Def //
var userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique:true
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    address:{
        type: String,
        required: true,
    },
    cart:{
        type:[],
    },
    orders:{
        type:[],
    }
  });

userSchema.methods = {
    autheticate: function(phoneNo) {
      return phoneNo !== user.phoneNo;
  },
}
//Create model fromthe schema
var User= mongoose.model("user", userSchema);

//Exporting the model
module.exports = User;
